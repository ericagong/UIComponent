import { useCallback, useRef } from 'react'

const toggleScroll = (force?: boolean) => {
    if (typeof force === 'boolean') {
        document.body.classList.toggle('no-scroll', force)
        return
    }
    const hasModals = document.querySelectorAll('dialog[open]').length > 0
    document.body.classList.toggle('no-scroll', hasModals)
}

const useModal = () => {
    const modalRef = useRef<HTMLDialogElement | null>(null)

    const openModal = useCallback(() => {
        if (modalRef.current) {
            modalRef.current.showModal()
            toggleScroll(true)
        }
    }, [])

    const closeModal = useCallback(() => {
        if (modalRef.current) {
            modalRef.current.close()
            toggleScroll()
        }
    }, [])

    return {
        modalRef,
        openModal,
        closeModal,
    }
}

export default useModal
