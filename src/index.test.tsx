import { render, fireEvent, cleanup, act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Modal, useModal } from '.'

afterEach(() => {
	cleanup()
	vi.clearAllMocks()
})

const baseProps = {
	closeLabel: 'Close'
}

describe('Modal', () => {
	it('is exported', () => {
		expect(Modal).toBeTruthy()
	})

	it('renders nothing for an unknown variant', () => {
		const { queryByText } = render(
			// @ts-expect-error deliberately invalid variant
			<Modal {...baseProps} variant='nope' title='Title' />
		)
		expect(queryByText('Title')).not.toBeInTheDocument()
	})

	it('renders nothing when isOpen is false', () => {
		const { queryByRole } = render(
			<Modal {...baseProps} variant='simple' title='Title' isOpen={false} />
		)
		expect(queryByRole('dialog')).not.toBeInTheDocument()
	})

	describe('simple', () => {
		it('renders the title and message', () => {
			const { getByText } = render(
				<Modal
					{...baseProps}
					variant='simple'
					title='CONGRATULATIONS!'
					message='Your modal is working'
				/>
			)
			expect(getByText('CONGRATULATIONS!')).toBeInTheDocument()
			expect(getByText('Your modal is working')).toBeInTheDocument()
		})

		it('calls onClose when the close button is clicked', () => {
			const onClose = vi.fn()
			const { getByText } = render(
				<Modal {...baseProps} variant='simple' onClose={onClose} />
			)
			fireEvent.click(getByText('Close'))
			expect(onClose).toHaveBeenCalledTimes(1)
		})
	})

	describe('approval', () => {
		const approvalProps = {
			...baseProps,
			variant: 'approval' as const,
			title: 'WARNING!',
			message: 'Are you sure?',
			approveLabel: 'Yes do it !'
		}

		it('renders the warning title and both buttons', () => {
			const { getByText } = render(<Modal {...approvalProps} />)
			expect(getByText('WARNING!')).toBeInTheDocument()
			expect(getByText('Are you sure?')).toBeInTheDocument()
			expect(getByText('Yes do it !')).toBeInTheDocument()
			expect(getByText('Close')).toBeInTheDocument()
		})

		it('calls onApprove when the approve button is clicked', () => {
			const onApprove = vi.fn()
			const { getByText } = render(
				<Modal {...approvalProps} onApprove={onApprove} />
			)
			fireEvent.click(getByText('Yes do it !'))
			expect(onApprove).toHaveBeenCalledTimes(1)
		})

		it('falls back to onClose when onCancel is omitted', () => {
			const onClose = vi.fn()
			const { getByText } = render(
				<Modal {...approvalProps} onClose={onClose} />
			)
			fireEvent.click(getByText('Close'))
			expect(onClose).toHaveBeenCalledTimes(1)
		})

		it('prefers onCancel over onClose', () => {
			const onClose = vi.fn()
			const onCancel = vi.fn()
			const { getByText } = render(
				<Modal {...approvalProps} onClose={onClose} onCancel={onCancel} />
			)
			fireEvent.click(getByText('Close'))
			expect(onCancel).toHaveBeenCalledTimes(1)
			expect(onClose).not.toHaveBeenCalled()
		})

		it('ships an inline warning icon, with no react-icons dependency', () => {
			const { container } = render(
				<Modal {...approvalProps} usePortal={false} showCloseButton={false} />
			)
			expect(container.querySelector('svg')).toBeInTheDocument()
		})

		it('lets a custom warningIcon replace the default', () => {
			const { getByTestId, container } = render(
				<Modal
					{...approvalProps}
					usePortal={false}
					showCloseButton={false}
					warningIcon={<i data-testid='custom-icon' />}
				/>
			)
			expect(getByTestId('custom-icon')).toBeInTheDocument()
			expect(container.querySelector('svg')).not.toBeInTheDocument()
		})
	})

	describe('form', () => {
		it('renders the provided formComponent', () => {
			const { getByText } = render(
				<Modal
					{...baseProps}
					variant='form'
					formComponent={<form>my form</form>}
				/>
			)
			expect(getByText('my form')).toBeInTheDocument()
		})
	})

	describe('v1 compatibility', () => {
		it('accepts the legacy variant names', () => {
			const { getByText } = render(
				<Modal currentModal='simpleModal' successTitle='Legacy' />
			)
			expect(getByText('Legacy')).toBeInTheDocument()
		})

		it('maps warningTitle and warningMessage on aprovalModal', () => {
			const { getByText } = render(
				<Modal
					currentModal='aprovalModal'
					warningTitle='Old warning'
					warningMessage='Old body'
					aprovalMessage='Old approve'
					closeMessage='Old close'
				/>
			)
			expect(getByText('Old warning')).toBeInTheDocument()
			expect(getByText('Old body')).toBeInTheDocument()
			expect(getByText('Old approve')).toBeInTheDocument()
			expect(getByText('Old close')).toBeInTheDocument()
		})

		it('still calls handleClose with the click event', () => {
			const handleClose = vi.fn()
			const { getByText } = render(
				<Modal
					currentModal='simpleModal'
					closeMessage='Close'
					handleClose={handleClose}
				/>
			)
			fireEvent.click(getByText('Close'))
			expect(handleClose).toHaveBeenCalledTimes(1)
			expect(handleClose.mock.calls[0][0]).toHaveProperty('type', 'click')
		})

		it('still calls handleAproval and handleCloseAproval', () => {
			const handleAproval = vi.fn()
			const handleCloseAproval = vi.fn()
			const { getByText } = render(
				<Modal
					currentModal='aprovalModal'
					aprovalMessage='Yes'
					closeMessage='No'
					handleAproval={handleAproval}
					handleCloseAproval={handleCloseAproval}
				/>
			)
			fireEvent.click(getByText('Yes'))
			fireEvent.click(getByText('No'))
			expect(handleAproval).toHaveBeenCalledTimes(1)
			expect(handleCloseAproval).toHaveBeenCalledTimes(1)
		})

		it('still dismisses via setShowModal on Escape', () => {
			const setShowModal = vi.fn()
			render(<Modal currentModal='simpleModal' setShowModal={setShowModal} />)
			fireEvent.keyDown(document, { key: 'Escape' })
			expect(setShowModal).toHaveBeenCalledWith(false)
		})

		it('honours the legacy aprovalButtonBgColor spelling', () => {
			const { getByText } = render(
				<Modal
					currentModal='aprovalModal'
					aprovalMessage='Yes'
					aprovalButtonBgColor='bg-fuchsia-500'
					usePortal={false}
				/>
			)
			expect(getByText('Yes').className).toContain('bg-fuchsia-500')
		})

		it('lets onClose win over the legacy handlers', () => {
			const onClose = vi.fn()
			const handleClose = vi.fn()
			const { getByText } = render(
				<Modal
					currentModal='simpleModal'
					closeMessage='Close'
					onClose={onClose}
					handleClose={handleClose}
				/>
			)
			fireEvent.click(getByText('Close'))
			expect(onClose).toHaveBeenCalledTimes(1)
			expect(handleClose).not.toHaveBeenCalled()
		})
	})

	describe('dismissal', () => {
		it('closes on the Escape key', () => {
			const onClose = vi.fn()
			render(<Modal {...baseProps} variant='simple' onClose={onClose} />)
			fireEvent.keyDown(document, { key: 'Escape' })
			expect(onClose).toHaveBeenCalledTimes(1)
		})

		it('does not close on Escape when closeOnEscape is false', () => {
			const onClose = vi.fn()
			render(
				<Modal
					{...baseProps}
					variant='simple'
					onClose={onClose}
					closeOnEscape={false}
				/>
			)
			fireEvent.keyDown(document, { key: 'Escape' })
			expect(onClose).not.toHaveBeenCalled()
		})

		it('removes its keydown listener on unmount', () => {
			const onClose = vi.fn()
			const { unmount } = render(
				<Modal {...baseProps} variant='simple' onClose={onClose} />
			)
			unmount()
			fireEvent.keyDown(document, { key: 'Escape' })
			expect(onClose).not.toHaveBeenCalled()
		})
	})

	describe('portal', () => {
		it('renders into document.body, not the inline container', () => {
			const { container, getByText } = render(
				<Modal {...baseProps} variant='simple' title='Hi' />
			)
			expect(container.childElementCount).toBe(0)
			expect(getByText('Hi').closest('[role="dialog"]')).toBeInTheDocument()
		})

		it('renders in place when usePortal is false', () => {
			const { container } = render(
				<Modal {...baseProps} variant='simple' title='Hi' usePortal={false} />
			)
			expect(container.querySelector('[role="dialog"]')).toBeInTheDocument()
		})

		it('honours a custom portalContainer', () => {
			const target = document.createElement('div')
			document.body.appendChild(target)
			render(
				<Modal
					{...baseProps}
					variant='simple'
					title='Hi'
					portalContainer={target}
				/>
			)
			expect(target.querySelector('[role="dialog"]')).toBeInTheDocument()
			document.body.removeChild(target)
		})
	})

	describe('accessibility', () => {
		it('exposes a labelled, described modal dialog', () => {
			const { getByRole, getByText } = render(
				<Modal
					{...baseProps}
					variant='simple'
					title='Title here'
					message='Body here'
				/>
			)
			const dialog = getByRole('dialog')
			expect(dialog).toHaveAttribute('aria-modal', 'true')
			expect(getByText('Title here').id).toBe(
				dialog.getAttribute('aria-labelledby')
			)
			expect(getByText('Body here').id).toBe(
				dialog.getAttribute('aria-describedby')
			)
		})

		it('falls back to ariaLabel when the modal has no title', () => {
			const { getByRole } = render(
				<Modal
					{...baseProps}
					variant='form'
					ariaLabel='Signup form'
					formComponent={<form>f</form>}
				/>
			)
			const dialog = getByRole('dialog')
			expect(dialog).toHaveAttribute('aria-label', 'Signup form')
			expect(dialog).not.toHaveAttribute('aria-labelledby')
		})

		it('gives each instance unique ids', () => {
			const { getAllByRole } = render(
				<div>
					<Modal {...baseProps} variant='simple' title='A' />
					<Modal {...baseProps} variant='simple' title='B' />
				</div>
			)
			const [first, second] = getAllByRole('dialog')
			expect(first.getAttribute('aria-labelledby')).not.toBe(
				second.getAttribute('aria-labelledby')
			)
		})

		it('moves focus to the close button on open', () => {
			const { getByText } = render(<Modal {...baseProps} variant='simple' />)
			expect(getByText('Close')).toHaveFocus()
		})

		it('prefers the close button over the approve button', () => {
			const { getByText } = render(
				<Modal {...baseProps} variant='approval' approveLabel='Yes' />
			)
			expect(getByText('Close')).toHaveFocus()
			expect(getByText('Yes')).not.toHaveFocus()
		})

		it('restores focus to the opener on unmount', () => {
			const opener = document.createElement('button')
			document.body.appendChild(opener)
			opener.focus()
			expect(opener).toHaveFocus()

			const { unmount } = render(<Modal {...baseProps} variant='simple' />)
			expect(opener).not.toHaveFocus()

			unmount()
			expect(opener).toHaveFocus()
			document.body.removeChild(opener)
		})

		it('wraps Tab from the last focusable back to the first', () => {
			const { getByText, getByLabelText } = render(
				<Modal {...baseProps} variant='approval' approveLabel='Yes' />
			)
			// DOM order inside the dialog: close, approve, then the X button.
			getByLabelText('Close dialog').focus()
			fireEvent.keyDown(document, { key: 'Tab' })
			expect(getByText('Close')).toHaveFocus()
		})

		it('wraps Shift+Tab from the first focusable back to the last', () => {
			const { getByText, getByLabelText } = render(
				<Modal {...baseProps} variant='approval' approveLabel='Yes' />
			)
			getByText('Close').focus()
			fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
			expect(getByLabelText('Close dialog')).toHaveFocus()
		})

		it('keeps the v2.0 tab cycle when showCloseButton is false', () => {
			const { getByText } = render(
				<Modal
					{...baseProps}
					variant='approval'
					approveLabel='Yes'
					showCloseButton={false}
				/>
			)
			getByText('Yes').focus()
			fireEvent.keyDown(document, { key: 'Tab' })
			expect(getByText('Close')).toHaveFocus()
		})
	})

	describe('body scroll lock', () => {
		it('locks while open and restores the previous value on unmount', () => {
			document.body.style.overflow = 'scroll'
			const { unmount } = render(<Modal {...baseProps} variant='simple' />)
			expect(document.body.style.overflow).toBe('hidden')
			unmount()
			expect(document.body.style.overflow).toBe('scroll')
			document.body.style.overflow = ''
		})

		it('does not lock while closed', () => {
			render(<Modal {...baseProps} variant='simple' isOpen={false} />)
			expect(document.body.style.overflow).not.toBe('hidden')
		})

		it('compensates the scrollbar width to avoid a layout shift', () => {
			const originalDescriptor = Object.getOwnPropertyDescriptor(
				window,
				'innerWidth'
			)
			Object.defineProperty(window, 'innerWidth', {
				value: 1024,
				configurable: true
			})
			Object.defineProperty(document.documentElement, 'clientWidth', {
				value: 1009,
				configurable: true
			})
			try {
				const { unmount } = render(<Modal {...baseProps} variant='simple' />)
				expect(document.body.style.paddingRight).toBe('15px')
				unmount()
				expect(document.body.style.paddingRight).toBe('')
			} finally {
				Reflect.deleteProperty(document.documentElement, 'clientWidth')
				if (originalDescriptor) {
					Object.defineProperty(window, 'innerWidth', originalDescriptor)
				}
			}
		})
	})

	describe('backdrop', () => {
		it('dismisses when the backdrop itself is clicked', () => {
			const onClose = vi.fn()
			const { getByTestId } = render(
				<Modal {...baseProps} variant='simple' onClose={onClose} />
			)
			fireEvent.click(getByTestId('rtfm-backdrop'))
			expect(onClose).toHaveBeenCalledTimes(1)
		})

		it('ignores clicks bubbling out of the dialog', () => {
			const onClose = vi.fn()
			const { getByText } = render(
				<Modal
					{...baseProps}
					variant='simple'
					title='Inside'
					onClose={onClose}
				/>
			)
			fireEvent.click(getByText('Inside'))
			expect(onClose).not.toHaveBeenCalled()
		})

		it('does not dismiss when closeOnBackdropClick is false', () => {
			const onClose = vi.fn()
			const { getByTestId } = render(
				<Modal
					{...baseProps}
					variant='simple'
					onClose={onClose}
					closeOnBackdropClick={false}
				/>
			)
			fireEvent.click(getByTestId('rtfm-backdrop'))
			expect(onClose).not.toHaveBeenCalled()
		})
	})

	describe('dismiss button (X)', () => {
		it('is rendered by default and calls onClose', () => {
			const onClose = vi.fn()
			const { getByLabelText } = render(
				<Modal {...baseProps} variant='simple' onClose={onClose} />
			)
			fireEvent.click(getByLabelText('Close dialog'))
			expect(onClose).toHaveBeenCalledTimes(1)
		})

		it('honours a custom closeButtonAriaLabel', () => {
			const { getByLabelText } = render(
				<Modal
					{...baseProps}
					variant='simple'
					closeButtonAriaLabel='Fermer'
				/>
			)
			expect(getByLabelText('Fermer')).toBeInTheDocument()
		})

		it('is absent when showCloseButton is false', () => {
			const { queryByLabelText } = render(
				<Modal {...baseProps} variant='simple' showCloseButton={false} />
			)
			expect(queryByLabelText('Close dialog')).not.toBeInTheDocument()
		})

		it('does not steal the initial focus from the footer close button', () => {
			const { getByText } = render(<Modal {...baseProps} variant='simple' />)
			expect(getByText('Close')).toHaveFocus()
		})
	})

	describe('exit animation', () => {
		it('keeps the dialog mounted until the exit animation ends', () => {
			const { rerender, getByRole, queryByRole } = render(
				<Modal {...baseProps} variant='simple' title='Bye' isOpen />
			)
			rerender(
				<Modal {...baseProps} variant='simple' title='Bye' isOpen={false} />
			)
			const dialog = getByRole('dialog')
			expect(dialog).toBeInTheDocument()
			fireEvent.animationEnd(dialog)
			expect(queryByRole('dialog')).not.toBeInTheDocument()
		})

		it('unmounts via the fallback timer when animationend never fires', () => {
			vi.useFakeTimers()
			try {
				const { rerender, getByRole, queryByRole } = render(
					<Modal {...baseProps} variant='simple' isOpen />
				)
				rerender(<Modal {...baseProps} variant='simple' isOpen={false} />)
				expect(getByRole('dialog')).toBeInTheDocument()
				act(() => {
					vi.advanceTimersByTime(500)
				})
				expect(queryByRole('dialog')).not.toBeInTheDocument()
			} finally {
				vi.useRealTimers()
			}
		})

		it('applies the exit animation classes while closing', () => {
			const { rerender, getByRole, getByTestId } = render(
				<Modal {...baseProps} variant='simple' isOpen />
			)
			rerender(<Modal {...baseProps} variant='simple' isOpen={false} />)
			expect(getByRole('dialog').className).toContain('animate-pop-out')
			expect(getByTestId('rtfm-backdrop').previousElementSibling?.className)
				.toContain('animate-fade-out')
		})

		it('honours a custom exitAnimation class', () => {
			const { rerender, getByRole } = render(
				<Modal
					{...baseProps}
					variant='simple'
					isOpen
					exitAnimation='animate-fade-out'
				/>
			)
			rerender(
				<Modal
					{...baseProps}
					variant='simple'
					isOpen={false}
					exitAnimation='animate-fade-out'
				/>
			)
			expect(getByRole('dialog').className).toContain('animate-fade-out')
		})

		it('closes immediately when the user prefers reduced motion', () => {
			vi.stubGlobal(
				'matchMedia',
				vi.fn().mockReturnValue({ matches: true })
			)
			try {
				const { rerender, queryByRole } = render(
					<Modal {...baseProps} variant='simple' isOpen />
				)
				rerender(<Modal {...baseProps} variant='simple' isOpen={false} />)
				expect(queryByRole('dialog')).not.toBeInTheDocument()
			} finally {
				vi.unstubAllGlobals()
			}
		})
	})

	describe('inert background', () => {
		it('marks the siblings of the portal inert while open', () => {
			const sibling = document.createElement('div')
			document.body.appendChild(sibling)
			const { unmount } = render(<Modal {...baseProps} variant='simple' />)
			expect(sibling).toHaveAttribute('inert')
			unmount()
			expect(sibling).not.toHaveAttribute('inert')
			document.body.removeChild(sibling)
		})

		it('leaves elements that were already inert untouched on close', () => {
			const sibling = document.createElement('div')
			sibling.setAttribute('inert', '')
			document.body.appendChild(sibling)
			const { unmount } = render(<Modal {...baseProps} variant='simple' />)
			unmount()
			expect(sibling).toHaveAttribute('inert')
			document.body.removeChild(sibling)
		})

		it('does nothing when usePortal is false', () => {
			const sibling = document.createElement('div')
			document.body.appendChild(sibling)
			render(<Modal {...baseProps} variant='simple' usePortal={false} />)
			expect(sibling).not.toHaveAttribute('inert')
			document.body.removeChild(sibling)
		})
	})

	describe('layout options', () => {
		it('defaults to the md width', () => {
			const { getByRole } = render(<Modal {...baseProps} variant='simple' />)
			expect(getByRole('dialog').className).toContain('sm:max-w-lg')
		})

		it('applies the requested size', () => {
			const { getByRole } = render(
				<Modal {...baseProps} variant='simple' size='lg' />
			)
			expect(getByRole('dialog').className).toContain('sm:max-w-2xl')
		})

		it('defaults the root z-index to 50 and honours the zIndex prop', () => {
			const { getByTestId, rerender } = render(
				<Modal {...baseProps} variant='simple' />
			)
			const root = (): HTMLElement =>
				getByTestId('rtfm-backdrop').parentElement as HTMLElement
			expect(root().style.zIndex).toBe('50')
			rerender(<Modal {...baseProps} variant='simple' zIndex={70} />)
			expect(root().style.zIndex).toBe('70')
		})

		it('adds the sheet classes on mobile when mobileSheet is set', () => {
			const { getByRole } = render(
				<Modal {...baseProps} variant='simple' mobileSheet />
			)
			const className = getByRole('dialog').className
			expect(className).toContain('max-sm:animate-slide-up-sheet')
			expect(className).toContain('max-sm:rounded-t-2xl')
		})

		it('appends the classNames slots after the defaults', () => {
			const { getByRole, getByText } = render(
				<Modal
					{...baseProps}
					variant='simple'
					classNames={{ panel: 'custom-panel', closeButton: 'custom-close' }}
				/>
			)
			expect(getByRole('dialog').className).toContain('custom-panel')
			expect(getByText('Close').className).toContain('custom-close')
		})

		it('themes the warning icon badge through the icon slot', () => {
			const { getByTestId } = render(
				<Modal
					{...baseProps}
					variant='approval'
					warningIcon={<i data-testid='icon' />}
					classNames={{ icon: 'custom-badge' }}
				/>
			)
			expect(getByTestId('icon').parentElement?.className).toContain(
				'custom-badge'
			)
		})
	})

	describe('composable API', () => {
		const composable = (
			<Modal isOpen onClose={() => {}}>
				<Modal.Header>Composed title</Modal.Header>
				<Modal.Body>Composed body</Modal.Body>
				<Modal.Footer>
					<button>Do it</button>
				</Modal.Footer>
			</Modal>
		)

		it('renders free children without a variant', () => {
			const { getByText } = render(composable)
			expect(getByText('Composed title')).toBeInTheDocument()
			expect(getByText('Composed body')).toBeInTheDocument()
			expect(getByText('Do it')).toBeInTheDocument()
		})

		it('wires Header and Body into the dialog aria attributes', () => {
			const { getByRole, getByText } = render(composable)
			const dialog = getByRole('dialog')
			expect(getByText('Composed title').id).toBe(
				dialog.getAttribute('aria-labelledby')
			)
			expect(getByText('Composed body').id).toBe(
				dialog.getAttribute('aria-describedby')
			)
		})

		it('renders nothing while isOpen is false', () => {
			const { queryByRole } = render(
				<Modal isOpen={false} onClose={() => {}}>
					<Modal.Body>Hidden</Modal.Body>
				</Modal>
			)
			expect(queryByRole('dialog')).not.toBeInTheDocument()
		})

		it('dismisses through the X button', () => {
			const onClose = vi.fn()
			const { getByLabelText } = render(
				<Modal isOpen onClose={onClose}>
					<Modal.Body>Content</Modal.Body>
				</Modal>
			)
			fireEvent.click(getByLabelText('Close dialog'))
			expect(onClose).toHaveBeenCalledTimes(1)
		})
	})

	describe('useModal', () => {
		it('opens, closes and toggles', () => {
			const { result } = renderHook(() => useModal())
			expect(result.current.isOpen).toBe(false)
			act(() => result.current.open())
			expect(result.current.isOpen).toBe(true)
			act(() => result.current.close())
			expect(result.current.isOpen).toBe(false)
			act(() => result.current.toggle())
			expect(result.current.isOpen).toBe(true)
		})

		it('honours the initialOpen argument', () => {
			const { result } = renderHook(() => useModal(true))
			expect(result.current.isOpen).toBe(true)
		})
	})
})
