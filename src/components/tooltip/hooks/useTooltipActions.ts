import { useCallback, useEffect, useRef, useState } from 'react'

import type { UseTooltipActionsProps } from '../types'

const useTooltipActions = ({
    initialOpen = false,
    openDelay = 100, // ms
    closeDelay = 100, // ms
}: UseTooltipActionsProps = {}) => {
    const [isOpen, setIsOpen] = useState(initialOpen)

    const openTimerId = useRef<number | null>(null)
    const closeTimerId = useRef<number | null>(null)

    const open = useCallback(() => {
        setIsOpen(true)
    }, [])

    const close = useCallback(() => {
        setIsOpen(false)
    }, [])

    const openWithDelay = useCallback(() => {
        if (openTimerId.current) clearTimeout(openTimerId.current)

        openTimerId.current = window.setTimeout(() => setIsOpen(true), openDelay)
    }, [openDelay])

    const closeWithDelay = useCallback(() => {
        if (closeTimerId.current) clearTimeout(closeTimerId.current)

        closeTimerId.current = window.setTimeout(() => setIsOpen(false), closeDelay)
    }, [closeDelay])

    // 컴포넌트 언마운트 시 타이머 정리
    useEffect(() => {
        return () => {
            if (openTimerId.current) clearTimeout(openTimerId.current)
            if (closeTimerId.current) clearTimeout(closeTimerId.current)
        }
    }, [])

    return { isOpen, open, close, openWithDelay, closeWithDelay }
}

export default useTooltipActions
