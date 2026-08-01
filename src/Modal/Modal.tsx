import {
	createContext,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
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
	'inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition duration-150 ease-in-out active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:ring-offset-zinc-900'

// Neutral secondary button: the dismissive action should not shout.
const CLOSE_BUTTON_SKIN =
	'border border-gray-300 bg-white hover:bg-gray-50 focus-visible:ring-gray-400 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10'

// The approval variant confirms a warning, so the confirm action carries the
// destructive colour and the cancel action stays neutral — not the reverse.
const APPROVE_BUTTON_SKIN =
	'bg-red-600 shadow-sm hover:bg-red-700 focus-visible:ring-red-500 dark:bg-red-500 dark:hover:bg-red-400'

// Covers the exit animation even if `animationend` never fires
// (e.g. `animation: none` via a consumer override).
const EXIT_FALLBACK_MS = 400

// Shared across instances so stacked modals lock once and the last one
// closing restores the original styles.
let scrollLockCount = 0
let savedOverflow = ''
let savedPaddingRight = ''

const lockBodyScroll = (): void => {
	if (scrollLockCount++ > 0) return
	savedOverflow = document.body.style.overflow
	savedPaddingRight = document.body.style.paddingRight
	const scrollbarWidth =
		window.innerWidth - document.documentElement.clientWidth
	document.body.style.overflow = 'hidden'
	if (scrollbarWidth > 0) {
		const computed =
			parseFloat(window.getComputedStyle(document.body).paddingRight) || 0
		document.body.style.paddingRight = `${computed + scrollbarWidth}px`
	}
}

const unlockBodyScroll = (): void => {
	scrollLockCount = Math.max(0, scrollLockCount - 1)
	if (scrollLockCount > 0) return
	document.body.style.overflow = savedOverflow
	document.body.style.paddingRight = savedPaddingRight
}

const prefersReducedMotion = (): boolean =>
	typeof window !== 'undefined' &&
	typeof window.matchMedia === 'function' &&
	window.matchMedia('(prefers-reduced-motion: reduce)').matches

const DefaultWarningIcon = (): React.JSX.Element => (
	<svg
		viewBox='0 0 24 24'
		aria-hidden='true'
		focusable='false'
		className='h-6 w-6 fill-current'
	>
		<path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v6h-2V7zm0 8h2v2h-2v-2z' />
	</svg>
)

const CloseIcon = (): React.JSX.Element => (
	<svg
		viewBox='0 0 24 24'
		aria-hidden='true'
		focusable='false'
		className='h-5 w-5'
		fill='none'
		stroke='currentColor'
		strokeWidth={2}
		strokeLinecap='round'
	>
		<path d='M6 6l12 12M18 6L6 18' />
	</svg>
)

export type ModalVariant = 'simple' | 'approval' | 'form'

/** Variant names accepted by v1. Still honoured, but prefer {@link ModalVariant}. */
export type LegacyModalVariant = 'simpleModal' | 'aprovalModal' | 'formModal'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

/** Extra classes appended after the default classes of each slot. */
export interface ModalClassNames {
	root?: string;
	backdrop?: string;
	panel?: string;
	title?: string;
	message?: string;
	/** The round badge holding the `approval` variant's warning icon. */
	icon?: string;
	closeButton?: string;
	approveButton?: string;
	/** The "X" button in the top-right corner. */
	dismissButton?: string;
}

const SIZE_CLASSES: Record<ModalSize, string> = {
	sm: 'sm:w-full sm:max-w-sm',
	md: 'sm:w-full sm:max-w-lg',
	lg: 'sm:w-full sm:max-w-2xl',
	xl: 'sm:w-full sm:max-w-4xl',
	full: 'sm:w-full sm:max-w-none min-h-full sm:rounded-none'
}

export interface ModalProps {
	/** Which layout to render. Legacy v1 names are still accepted. */
	variant?: ModalVariant | LegacyModalVariant;
	/**
	 * Free content, rendered when no `variant` is given. Compose with
	 * `Modal.Header`, `Modal.Body` and `Modal.Footer` for the default styling.
	 */
	children?: ReactNode;
	/**
	 * When `false`, nothing renders. Toggling from `true` to `false` plays the
	 * exit animation before unmounting; unmounting the component yourself
	 * (`{show && <Modal/>}`) skips it.
	 */
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

	/** Panel width. Defaults to `'md'`, the pre-2.1 width. */
	size?: ModalSize;
	/** `z-index` of the modal root. Defaults to `50`. */
	zIndex?: number;
	/** Render the "X" dismiss button in the top-right corner. Defaults to `true`. */
	showCloseButton?: boolean;
	/** Accessible name of the "X" dismiss button. Defaults to `'Close dialog'`. */
	closeButtonAriaLabel?: string;
	/**
	 * On viewports below `sm`, dock the panel to the bottom edge as a
	 * full-width sheet with a slide-up animation. Defaults to `false`.
	 */
	mobileSheet?: boolean;
	/** Extra classes appended to each slot's defaults. */
	classNames?: ModalClassNames;

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

	/** Entrance animation class of the panel. Defaults to `animate-pop-in`. */
	animation?: string;
	/** Exit animation class of the panel. Defaults to `animate-pop-out`. */
	exitAnimation?: string;
	modalBackground?: string;
	darkModalBackground?: string;
	successTitleColor?: string;
	darkSuccessTitleColor?: string;
	warningTitleColor?: string;
	/** @deprecated Use {@link ModalProps.classNames}`.message`. */
	messageTextColor?: string;
	/** @deprecated Use {@link ModalProps.classNames}. */
	buttonsTextColor?: string;
	/** @deprecated Use {@link ModalProps.classNames}`.closeButton`. */
	closeButtonBgColor?: string;
	/** @deprecated Use {@link ModalProps.classNames}`.approveButton`. */
	approveButtonBgColor?: string;
	/** @deprecated Use {@link ModalProps.classNames}`.approveButton`. */
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

interface ModalContextValue {
	titleId?: string;
	descriptionId?: string;
}

const ModalContext = createContext<ModalContextValue>({})

interface ModalSectionProps {
	children?: ReactNode;
	className?: string;
}

const ModalHeader = ({ children, className }: ModalSectionProps): React.JSX.Element => {
	const { titleId } = useContext(ModalContext)
	return (
		<div
			id={titleId}
			className={`pr-8 text-lg font-semibold tracking-tight text-gray-900 dark:text-white ${className ?? ''}`}
		>
			{children}
		</div>
	)
}

const ModalBody = ({ children, className }: ModalSectionProps): React.JSX.Element => {
	const { descriptionId } = useContext(ModalContext)
	return (
		<div
			id={descriptionId}
			className={`mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400 ${className ?? ''}`}
		>
			{children}
		</div>
	)
}

const ModalFooter = ({ children, className }: ModalSectionProps): React.JSX.Element => (
	<div
		className={`mt-6 flex flex-wrap items-center justify-end gap-3 ${className ?? ''}`}
	>
		{children}
	</div>
)

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

const ModalRoot = (props: ModalProps): React.JSX.Element | null => {
	const refApproveButton = useRef<HTMLButtonElement>(null)
	const refCloseButton = useRef<HTMLButtonElement>(null)
	const refDismissButton = useRef<HTMLButtonElement>(null)
	const refDialog = useRef<HTMLDivElement>(null)
	const refRoot = useRef<HTMLDivElement>(null)

	const instanceId = useId()
	const titleId = `${instanceId}-title`
	const descriptionId = `${instanceId}-description`

	const variant = resolveVariant(props.variant, props.currentModal)
	const hasChildren =
		props.children !== undefined &&
		props.children !== null &&
		props.children !== false
	const wantsOpen =
		props.isOpen !== false && (variant !== null || hasChildren)

	const { onClose, setShowModal, closeOnEscape, usePortal } = props

	// A dismissal with no originating button: Escape and backdrop clicks.
	// v1 only ever called `setShowModal(false)` here, so keep that path intact
	// for consumers that have not migrated to `onClose`.
	const dismissRef = useRef<() => void>(undefined)
	dismissRef.current = () => {
		if (onClose) onClose()
		else if (setShowModal) setShowModal(false)
	}

	// `isOpen` going false enters a short "closing" phase so the exit
	// animation can play; the modal stays mounted until it ends.
	const [closing, setClosing] = useState(false)
	const wasOpen = useRef(false)

	useEffect(() => {
		if (wantsOpen) {
			wasOpen.current = true
			setClosing(false)
			return
		}
		if (!wasOpen.current) return
		wasOpen.current = false
		if (prefersReducedMotion()) return
		setClosing(true)
		const timer = window.setTimeout(() => setClosing(false), EXIT_FALLBACK_MS)
		return () => window.clearTimeout(timer)
	}, [wantsOpen])

	const rendered = wantsOpen || closing

	// Native listener rather than React's onAnimationEnd: animation events on
	// a portaled subtree do not reliably reach React's delegated root.
	useEffect(() => {
		if (!closing) return
		const dialog = refDialog.current
		if (!dialog) return
		const onEnd = (event: AnimationEvent): void => {
			if (event.target === dialog) setClosing(false)
		}
		dialog.addEventListener('animationend', onEnd)
		return () => dialog.removeEventListener('animationend', onEnd)
	}, [closing])

	// Dismiss on Escape, and keep Tab cycling inside the dialog.
	useEffect(() => {
		if (!wantsOpen) return

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
	}, [wantsOpen, closeOnEscape])

	// Stop the page behind the modal from scrolling, compensating for the
	// vanished scrollbar so the layout does not shift.
	useEffect(() => {
		if (!rendered) return
		lockBodyScroll()
		return unlockBodyScroll
	}, [rendered])

	// Make the rest of the page inert for assistive tech while open.
	// Runs before the focus effect so its cleanup lifts `inert` before
	// focus is handed back to the opener.
	useEffect(() => {
		if (!rendered || usePortal === false) return
		const root = refRoot.current
		const container = root?.parentElement
		if (!root || !container) return

		const touched: Element[] = []
		for (const sibling of Array.from(container.children)) {
			if (sibling === root || sibling.hasAttribute('inert')) continue
			sibling.setAttribute('inert', '')
			touched.push(sibling)
		}
		return () => touched.forEach((element) => element.removeAttribute('inert'))
	}, [rendered, usePortal])

	// Move focus in on open, hand it back to the opener on close.
	useEffect(() => {
		if (!wantsOpen) return

		const previouslyFocused = document.activeElement as HTMLElement | null
		// Prefer the dismissive buttons so Enter never fires a destructive action.
		const initial =
			refCloseButton.current ||
			refDismissButton.current ||
			refApproveButton.current ||
			getFocusable(refDialog.current)[0] ||
			refDialog.current
		initial?.focus()

		return () => {
			if (typeof previouslyFocused?.focus === 'function') {
				previouslyFocused.focus()
			}
		}
	}, [wantsOpen])

	const contextValue = useMemo(
		() => ({ titleId, descriptionId }),
		[titleId, descriptionId]
	)

	if (!rendered) return null

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

	const slots = props.classNames

	// A custom background means the button is filled, so it keeps the v2 white
	// label; otherwise it falls back to the neutral secondary skin.
	const closeButtonClass = `${BUTTON_BASE} ${
		props.closeButtonBgColor
			? `border border-gray-300 dark:border-white/15 focus-visible:ring-gray-400 ${props.closeButtonBgColor}`
			: CLOSE_BUTTON_SKIN
	} ${
		props.buttonsTextColor ??
		(props.closeButtonBgColor ? 'text-white' : 'text-gray-700 dark:text-gray-200')
	} ${slots?.closeButton ?? ''}`

	const approveBg = props.approveButtonBgColor ?? props.aprovalButtonBgColor
	const darkApproveBg =
		props.darkApproveButtonBgColor ?? props.darkAprovalButtonBgColor
	const approveButtonClass = `${BUTTON_BASE} ${
		props.buttonsTextColor ?? 'text-white'
	} ${
		approveBg
			? `shadow-sm focus-visible:ring-gray-400 ${approveBg}`
			: APPROVE_BUTTON_SKIN
	} ${darkApproveBg ?? ''} ${slots?.approveButton ?? ''}`

	const messageClass = `mt-2 text-sm leading-6 ${
		props.messageTextColor ?? 'text-gray-500 dark:text-gray-400'
	} ${slots?.message ?? ''}`

	const titleClass = 'text-lg font-semibold tracking-tight'

	const renderBody = (): ReactNode => {
		switch (variant) {
		case 'simple':
			return (
				<div className='flex flex-col items-center text-center'>
					<h2
						id={titleId}
						className={`${titleClass} ${
							props.successTitleColor ?? 'text-gray-900'
						} ${props.darkSuccessTitleColor ?? 'dark:text-white'} ${
							slots?.title ?? ''
						}`}
					>
						{title}
					</h2>
					<div id={descriptionId} className={messageClass}>
						{message}
					</div>
					<div className='mt-6 flex w-full justify-center'>
						<button
							ref={refCloseButton}
							onClick={onCloseClick}
							className={`${closeButtonClass} min-w-28`}
						>
							{closeLabel}
						</button>
					</div>
				</div>
			)
		case 'approval':
			return (
				<div className='flex flex-col items-center text-center'>
					<span
						className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400 ${
							slots?.icon ?? ''
						}`}
					>
						{props.warningIcon ?? <DefaultWarningIcon />}
					</span>
					<h2
						id={titleId}
						className={`${titleClass} ${
							props.warningTitleColor ?? 'text-gray-900 dark:text-white'
						} ${slots?.title ?? ''}`}
					>
						{title}
					</h2>
					<div id={descriptionId} className={messageClass}>
						{message}
					</div>
					{/* Cancel first so the visual order matches the tab order. */}
					<div className='mt-6 flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-center'>
						<button
							ref={refCloseButton}
							onClick={onCancelClick}
							className={`${closeButtonClass} sm:min-w-28`}
						>
							{closeLabel}
						</button>
						<button
							ref={refApproveButton}
							onClick={onApprove}
							className={`${approveButtonClass} sm:min-w-28`}
						>
							{approveLabel}
						</button>
					</div>
				</div>
			)
		case 'form':
			return <div>{props.formComponent}</div>
		default:
			return props.children ?? null
		}
	}

	const labelledById = title || (variant === null && hasChildren) ? titleId : undefined

	const enterAnimation = `${props.animation ?? 'animate-pop-in'}${
		props.mobileSheet ? ' max-sm:animate-slide-up-sheet' : ''
	}`
	const panelAnimation = closing
		? props.exitAnimation ?? 'animate-pop-out'
		: enterAnimation

	const modal = (
		<div
			ref={refRoot}
			className={`fixed inset-0 overflow-y-auto ${slots?.root ?? ''}`}
			style={{ zIndex: props.zIndex ?? 50 }}
		>
			<div
				aria-hidden='true'
				className={`fixed inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/60 motion-reduce:animate-none ${
					closing ? 'animate-fade-out' : 'animate-fade-in'
				} ${slots?.backdrop ?? ''}`}
			/>
			<div
				onClick={onBackdropClick}
				data-testid='rtfm-backdrop'
				className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'
			>
				<div
					ref={refDialog}
					role='dialog'
					aria-modal='true'
					aria-labelledby={props.ariaLabel ? undefined : labelledById}
					aria-describedby={
						message || (variant === null && hasChildren) ? descriptionId : undefined
					}
					aria-label={labelledById && !props.ariaLabel ? undefined : props.ariaLabel}
					tabIndex={-1}
					className={`relative transform overflow-hidden rounded-2xl text-left shadow-[0_24px_60px_-12px_rgba(15,23,42,0.35)] ring-1 ring-black/5 dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] dark:ring-white/10 motion-reduce:animate-none ${
						SIZE_CLASSES[props.size ?? 'md']
					}${
						props.mobileSheet
							? ' max-sm:w-full max-sm:rounded-t-2xl max-sm:rounded-b-none'
							: ''
					} ${panelAnimation} ${slots?.panel ?? ''}`}
				>
					<div
						className={`${props.modalBackground ?? 'bg-white'} ${
							props.darkModalBackground ?? 'dark:bg-zinc-900'
						} mx-auto p-5 sm:p-6`}
					>
						<ModalContext.Provider value={contextValue}>
							{renderBody()}
						</ModalContext.Provider>
					</div>
					{props.showCloseButton !== false && (
						<button
							ref={refDismissButton}
							type='button'
							aria-label={props.closeButtonAriaLabel ?? 'Close dialog'}
							onClick={onCloseClick}
							className={`absolute right-3 top-3 rounded-full p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-black/5 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 active:scale-95 dark:hover:bg-white/10 dark:hover:text-gray-200 ${
								slots?.dismissButton ?? ''
							}`}
						>
							<CloseIcon />
						</button>
					)}
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

const Modal = Object.assign(ModalRoot, {
	Header: ModalHeader,
	Body: ModalBody,
	Footer: ModalFooter
})

export default Modal
