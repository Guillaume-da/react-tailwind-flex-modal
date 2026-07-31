import {
	useEffect,
	useId,
	useRef,
	type Dispatch,
	type MouseEvent,
	type MouseEventHandler,
	type ReactNode,
	type SetStateAction
} from 'react'
import { createPortal } from 'react-dom'

const FOCUSABLE_SELECTOR = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])'
].join(',')

const getFocusable = (root: HTMLElement | null): HTMLElement[] =>
	root
		? Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
			(element) => !element.hasAttribute('hidden')
		)
		: []

const BUTTON_BASE =
	'mt-10 h-10 px-5 rounded-lg border border-gray-300 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2'

const DefaultWarningIcon = (): React.JSX.Element => (
	<svg
		viewBox='0 0 24 24'
		aria-hidden='true'
		focusable='false'
		className='mr-3 h-8 w-8 fill-current'
	>
		<path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v6h-2V7zm0 8h2v2h-2v-2z' />
	</svg>
)

export type ModalVariant = 'simple' | 'approval' | 'form'

/** Variant names accepted by v1. Still honoured, but prefer {@link ModalVariant}. */
export type LegacyModalVariant = 'simpleModal' | 'aprovalModal' | 'formModal'

export interface ModalProps {
	/** Which layout to render. Legacy v1 names are still accepted. */
	variant?: ModalVariant | LegacyModalVariant;
	/** When `false`, nothing renders. Omit to control mounting yourself. */
	isOpen?: boolean;
	/** Called for every dismissal: close button, cancel button, Escape, backdrop. */
	onClose?: () => void;
	/** Confirm action of the `approval` variant. */
	onApprove?: () => void;
	/** Cancel action of the `approval` variant. Defaults to `onClose`. */
	onCancel?: () => void;

	title?: string;
	message?: string;
	closeLabel?: string;
	approveLabel?: string;
	warningIcon?: ReactNode;
	formComponent?: ReactNode;

	/** Accessible name, used when the variant renders no title (e.g. `form`). */
	ariaLabel?: string;
	/** Dismiss when the backdrop is clicked. Defaults to `true`. */
	closeOnBackdropClick?: boolean;
	/** Dismiss on the Escape key. Defaults to `true`. */
	closeOnEscape?: boolean;
	/** Render into `document.body` instead of in place. Defaults to `true`. */
	usePortal?: boolean;
	/** Portal target. Defaults to `document.body`. */
	portalContainer?: HTMLElement;

	animation?: string;
	modalBackground?: string;
	darkModalBackground?: string;
	successTitleColor?: string;
	darkSuccessTitleColor?: string;
	warningTitleColor?: string;
	messageTextColor?: string;
	buttonsTextColor?: string;
	closeButtonBgColor?: string;
	approveButtonBgColor?: string;
	darkApproveButtonBgColor?: string;

	/** @deprecated Use {@link ModalProps.variant}. */
	currentModal?: string;
	/** @deprecated Use {@link ModalProps.onClose}. */
	setShowModal?: Dispatch<SetStateAction<boolean>>;
	/** @deprecated Use {@link ModalProps.onClose}. */
	handleClose?: MouseEventHandler<HTMLButtonElement>;
	/** @deprecated Use {@link ModalProps.onApprove}. */
	handleAproval?: () => void;
	/** @deprecated Use {@link ModalProps.onCancel}. */
	handleCloseAproval?: MouseEventHandler<HTMLButtonElement>;
	/** @deprecated Use {@link ModalProps.title}. */
	successTitle?: string;
	/** @deprecated Use {@link ModalProps.title}. */
	warningTitle?: string;
	/** @deprecated Use {@link ModalProps.message}. */
	warningMessage?: string;
	/** @deprecated Use {@link ModalProps.closeLabel}. */
	closeMessage?: string;
	/** @deprecated Use {@link ModalProps.approveLabel}. */
	aprovalMessage?: string;
	/** @deprecated Use {@link ModalProps.approveButtonBgColor}. */
	aprovalButtonBgColor?: string;
	/** @deprecated Use {@link ModalProps.darkApproveButtonBgColor}. */
	darkAprovalButtonBgColor?: string;
}

const resolveVariant = (
	variant: ModalProps['variant'],
	legacy: string | undefined
): ModalVariant | null => {
	switch (variant ?? legacy) {
	case 'simple':
	case 'simpleModal':
		return 'simple'
	case 'approval':
	case 'aprovalModal':
		return 'approval'
	case 'form':
	case 'formModal':
		return 'form'
	default:
		return null
	}
}

const Modal = (props: ModalProps): React.JSX.Element | null => {
	const refApproveButton = useRef<HTMLButtonElement>(null)
	const refCloseButton = useRef<HTMLButtonElement>(null)
	const refDialog = useRef<HTMLDivElement>(null)

	const instanceId = useId()
	const titleId = `${instanceId}-title`
	const descriptionId = `${instanceId}-description`

	const variant = resolveVariant(props.variant, props.currentModal)
	const isOpen = props.isOpen !== false && variant !== null

	const { onClose, setShowModal, closeOnEscape } = props

	// A dismissal with no originating button: Escape and backdrop clicks.
	// v1 only ever called `setShowModal(false)` here, so keep that path intact
	// for consumers that have not migrated to `onClose`.
	const dismissRef = useRef<() => void>(undefined)
	dismissRef.current = () => {
		if (onClose) onClose()
		else if (setShowModal) setShowModal(false)
	}

	// Dismiss on Escape, and keep Tab cycling inside the dialog.
	useEffect(() => {
		if (!isOpen) return

		const onKeyDown = (event: KeyboardEvent): void => {
			if (event.key === 'Escape') {
				if (closeOnEscape !== false) dismissRef.current?.()
				return
			}
			if (event.key !== 'Tab') return

			const dialog = refDialog.current
			if (!dialog) return

			const focusable = getFocusable(dialog)
			if (focusable.length === 0) {
				event.preventDefault()
				return
			}

			const first = focusable[0]
			const last = focusable[focusable.length - 1]
			const active = document.activeElement

			if (event.shiftKey && (active === first || !dialog.contains(active))) {
				event.preventDefault()
				last.focus()
			} else if (!event.shiftKey && active === last) {
				event.preventDefault()
				first.focus()
			}
		}

		document.addEventListener('keydown', onKeyDown)
		return () => document.removeEventListener('keydown', onKeyDown)
	}, [isOpen, closeOnEscape])

	// Stop the page behind the modal from scrolling.
	useEffect(() => {
		if (!isOpen) return

		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = previousOverflow
		}
	}, [isOpen])

	// Move focus in on open, hand it back to the opener on close.
	useEffect(() => {
		if (!isOpen) return

		const previouslyFocused = document.activeElement as HTMLElement | null
		// Prefer the dismissive button so Enter never fires a destructive action.
		const initial =
			refCloseButton.current ||
			refApproveButton.current ||
			getFocusable(refDialog.current)[0] ||
			refDialog.current
		initial?.focus()

		return () => {
			if (typeof previouslyFocused?.focus === 'function') {
				previouslyFocused.focus()
			}
		}
	}, [isOpen])

	if (!isOpen) return null

	const title =
		props.title ??
		(variant === 'approval' ? props.warningTitle : props.successTitle)
	const message = props.message ?? props.warningMessage
	const closeLabel = props.closeLabel ?? props.closeMessage
	const approveLabel = props.approveLabel ?? props.aprovalMessage

	const onApprove = props.onApprove ?? props.handleAproval

	// The close button did carry an event in v1, so legacy handlers still get one.
	const onCloseClick = (event: MouseEvent<HTMLButtonElement>): void => {
		if (props.onClose) props.onClose()
		else if (props.handleClose) props.handleClose(event)
		else if (props.setShowModal) props.setShowModal(false)
	}

	const onCancelClick = (event: MouseEvent<HTMLButtonElement>): void => {
		if (props.onCancel) props.onCancel()
		else if (props.onClose) props.onClose()
		else if (props.handleCloseAproval) props.handleCloseAproval(event)
		else onCloseClick(event)
	}

	const onBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
		if (props.closeOnBackdropClick === false) return
		// Ignore clicks that bubbled up from the dialog itself.
		if (event.target !== event.currentTarget) return
		dismissRef.current?.()
	}

	const closeButtonClass = `${BUTTON_BASE} ${
		props.buttonsTextColor ?? 'text-white'
	} ${
		props.closeButtonBgColor ?? 'bg-red-600'
	} dark:border-red-600 hover:bg-red-700 hover:text-green-100 focus:ring-red-500`

	const approveButtonClass = `${BUTTON_BASE} ${
		props.buttonsTextColor ?? 'text-white'
	} ${
		props.approveButtonBgColor ?? props.aprovalButtonBgColor ?? 'bg-lime-600'
	} ${
		props.darkApproveButtonBgColor ??
		props.darkAprovalButtonBgColor ??
		'dark:bg-lime-600'
	} dark:border-lime-600 hover:bg-lime-700 hover:text-green-100 focus:ring-lime-500`

	const messageClass = `text-lg font-semibold ${
		props.messageTextColor ?? 'text-gray-500'
	}`

	const renderBody = (): ReactNode => {
		switch (variant) {
		case 'simple':
			return (
				<div className='flex flex-col items-center p-6'>
					<div
						id={titleId}
						className={`flex text-xl font-semibold uppercase ${
							props.successTitleColor ?? 'text-lime-600'
						} ${props.darkSuccessTitleColor ?? 'dark:text-lime-600'}`}
					>
						{title}
					</div>
					<div id={descriptionId} className={messageClass}>
						{message}
					</div>
					<div className='flex gap-x-4 -mt-4'>
						<button
							ref={refCloseButton}
							onClick={onCloseClick}
							className={closeButtonClass}
						>
							{closeLabel}
						</button>
					</div>
				</div>
			)
		case 'approval':
			return (
				<div className='flex flex-col items-center p-6'>
					<div
						id={titleId}
						className={`flex items-center text-xl font-semibold mb-4 ${
							props.warningTitleColor ?? 'text-red-500'
						}`}
					>
						{props.warningIcon ?? <DefaultWarningIcon />} {title}
					</div>
					<div id={descriptionId} className={messageClass}>
						{message}
					</div>
					<div className='flex gap-x-4 -mt-4'>
						<button
							ref={refApproveButton}
							onClick={onApprove}
							className={approveButtonClass}
						>
							{approveLabel}
						</button>
						<button
							ref={refCloseButton}
							onClick={onCancelClick}
							className={closeButtonClass}
						>
							{closeLabel}
						</button>
					</div>
				</div>
			)
		case 'form':
			return <div>{props.formComponent}</div>
		default:
			return null
		}
	}

	const modal = (
		<div className='fixed inset-0 z-10 overflow-y-auto'>
			<div
				onClick={onBackdropClick}
				data-testid='rtfm-backdrop'
				className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 bg-white/60 dark:bg-zinc-600'
			>
				<div
					ref={refDialog}
					role='dialog'
					aria-modal='true'
					aria-labelledby={title ? titleId : undefined}
					aria-describedby={message ? descriptionId : undefined}
					aria-label={title ? undefined : props.ariaLabel}
					tabIndex={-1}
					className={`relative transform overflow-hidden rounded-lg dark:bg-zinc-600 text-left shadow-xl transition-all sm:w-full sm:max-w-lg ${
						props.animation ?? 'animate-fade-in-up'
					}`}
				>
					<div
						className={`${props.modalBackground ?? 'bg-white'} ${
							props.darkModalBackground ?? 'dark:bg-zinc-800'
						} mx-auto px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}
					>
						{renderBody()}
					</div>
				</div>
			</div>
		</div>
	)

	// Portalling keeps the modal out of any clipping/stacking parent.
	// Guarded so the component stays importable in a non-DOM (SSR) render.
	if (props.usePortal === false || typeof document === 'undefined') {
		return modal
	}
	return createPortal(modal, props.portalContainer ?? document.body)
}

export default Modal
