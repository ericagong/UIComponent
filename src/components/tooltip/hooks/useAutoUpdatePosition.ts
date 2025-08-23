import type { RefObject } from 'react'
import { useEffect, useLayoutEffect } from 'react'

const useAutoUpdatePosition = (
    triggerRef: RefObject<HTMLElement | null>,
    contentRef: RefObject<HTMLElement | null>,
    updatePosition: () => void
) => {
    useLayoutEffect(() => {
        const $trigger = triggerRef.current
        const $content = contentRef.current
        if (!$trigger || !$content) return

        updatePosition()
    }, [triggerRef, contentRef, updatePosition])

    useEffect(() => {
        const $trigger = triggerRef.current
        const $content = contentRef.current
        if (!$trigger || !$content) return

        const handleUpdate = () => updatePosition()

        window.addEventListener('resize', handleUpdate)

        window.addEventListener('scroll', handleUpdate, true)

        const resizeObserver = new ResizeObserver(handleUpdate)
        resizeObserver.observe($trigger)
        resizeObserver.observe($content)

        const intersectionObserver = new IntersectionObserver(handleUpdate, {
            root: null,
            threshold: [0, 1],
        })
        intersectionObserver.observe($trigger)
        intersectionObserver.observe($content)

        return () => {
            window.removeEventListener('resize', handleUpdate)
            window.removeEventListener('scroll', handleUpdate, true)
            resizeObserver.disconnect()
            intersectionObserver.disconnect()
        }
    }, [triggerRef, contentRef, updatePosition])
}

export default useAutoUpdatePosition
