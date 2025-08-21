import type { RefObject } from 'react'
import { useLayoutEffect, useRef, useState } from 'react'

type PlacementStyle = {
    position: 'absolute'
    top: number
    left: number
}

const isVerticallyOutOfViewport = (triggerRect: DOMRect, contentRect: DOMRect) =>
    triggerRect.bottom + contentRect.height > window.innerHeight

const isHorizontallyOutOfViewport = (triggerRect: DOMRect, contentRect: DOMRect) =>
    triggerRect.left + contentRect.width > window.innerWidth

const placeBelow = (triggerRect: DOMRect) => triggerRect.bottom + window.scrollY
const placeAbove = (triggerRect: DOMRect, contentRect: DOMRect) =>
    triggerRect.top - contentRect.height + window.scrollY
const alignLeft = (triggerRect: DOMRect) => triggerRect.left + window.scrollX
const alignRight = (triggerRect: DOMRect, contentRect: DOMRect) =>
    triggerRect.right - contentRect.width + window.scrollX

const calculateContentPlacement = (triggerRect: DOMRect, contentRect: DOMRect): PlacementStyle => {
    const top = !isVerticallyOutOfViewport(triggerRect, contentRect)
        ? placeBelow(triggerRect)
        : placeAbove(triggerRect, contentRect)

    const left = !isHorizontallyOutOfViewport(triggerRect, contentRect)
        ? alignLeft(triggerRect)
        : alignRight(triggerRect, contentRect)

    return { top, left, position: 'absolute' }
}

const useTooltipContentPlacement = (triggerRef: RefObject<HTMLElement | null>) => {
    const contentRef = useRef<HTMLDivElement | null>(null)
    const [style, setStyle] = useState<PlacementStyle>({
        top: 0,
        left: 0,
        position: 'absolute',
    })

    useLayoutEffect(() => {
        const $trigger = triggerRef.current
        const $content = contentRef.current
        if (!$trigger || !$content) return

        const updatePosition = () => {
            const triggerRect = $trigger.getBoundingClientRect()
            const contentRect = $content.getBoundingClientRect()
            setStyle(calculateContentPlacement(triggerRect, contentRect))
        }

        updatePosition()
        window.addEventListener('resize', updatePosition)
        window.addEventListener('scroll', updatePosition, true)

        return () => {
            window.removeEventListener('resize', updatePosition)
            window.removeEventListener('scroll', updatePosition, true)
        }
    }, [triggerRef])

    return { contentRef, style }
}

export default useTooltipContentPlacement
