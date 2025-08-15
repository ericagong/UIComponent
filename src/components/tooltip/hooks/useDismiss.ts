import { useEffect } from 'react'

import { isEventInTargets, isStandardMouseLeftClick } from '@/utils/events'

import type { UseDismissProps } from '../types'

const useDismiss = ({
    isOpen,
    close,
    targetRefs,
    options = { closeOnOutside: true, closeOnEsc: true },
}: UseDismissProps) => {
    // 외부 영역 마우스, 펜, 터치 누르면 닫기
    useEffect(() => {
        if (!isOpen || !options.closeOnOutside) return

        const handlePointerDown = (e: PointerEvent) => {
            if (e.defaultPrevented) return
            if (!isStandardMouseLeftClick(e)) return

            const $targets = targetRefs.map(ref => ref.current)
            if (isEventInTargets(e, ...$targets)) return

            close()
        }

        document.addEventListener('pointerdown', handlePointerDown)

        return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [isOpen, options.closeOnOutside, targetRefs, close])

    // ESC 누르면 닫기
    useEffect(() => {
        if (!isOpen || !options.closeOnEsc) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, options.closeOnEsc, close])
}

export default useDismiss
