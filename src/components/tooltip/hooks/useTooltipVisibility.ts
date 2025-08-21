import { useRef, useState } from 'react'

const OPEN_DELAY = 150
const CLOSE_DELAY = 150

const useTooltipVisibility = () => {
    const [isOpen, setIsOpen] = useState(false)
    const openTimerRef = useRef<number | null>(null)
    const closeTimerRef = useRef<number | null>(null)

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    const cancelPrevOpenRequest = () => {
        if (openTimerRef.current !== null) {
            clearTimeout(openTimerRef.current)
            openTimerRef.current = null
        }
    }

    const cancelPrevCloseRequest = () => {
        if (closeTimerRef.current !== null) {
            clearTimeout(closeTimerRef.current)
            closeTimerRef.current = null
        }
    }

    const requestOpen = () => {
        cancelPrevCloseRequest()
        open()
    }

    const requestClose = () => {
        cancelPrevOpenRequest()
        close()
    }

    const requestOpenWithDelay = () => {
        cancelPrevCloseRequest()
        openTimerRef.current = window.setTimeout(() => {
            open()
            openTimerRef.current = null
        }, OPEN_DELAY)
    }

    const requestCloseWithDelay = () => {
        cancelPrevOpenRequest()
        closeTimerRef.current = window.setTimeout(() => {
            close()
            closeTimerRef.current = null
        }, CLOSE_DELAY)
    }

    return {
        isOpen,
        requestOpen,
        requestClose,
        requestOpenWithDelay,
        requestCloseWithDelay,
    }
}

export default useTooltipVisibility
