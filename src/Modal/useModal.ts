import { useCallback, useState } from 'react'

export interface UseModalResult {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
}

/**
 * Tiny state helper for driving a {@link Modal}.
 *
 * ```tsx
 * const { isOpen, open, close } = useModal()
 * <button onClick={open}>Open</button>
 * <Modal isOpen={isOpen} onClose={close}>…</Modal>
 * ```
 */
export const useModal = (initialOpen = false): UseModalResult => {
	const [isOpen, setIsOpen] = useState(initialOpen)
	const open = useCallback(() => setIsOpen(true), [])
	const close = useCallback(() => setIsOpen(false), [])
	const toggle = useCallback(() => setIsOpen((value) => !value), [])
	return { isOpen, open, close, toggle }
}
