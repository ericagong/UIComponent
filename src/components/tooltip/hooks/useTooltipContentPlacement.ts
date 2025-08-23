import { useRef, useState } from 'react'
import { RefObject } from 'react'

import type { PlacementStyle } from '@/utils/placement'
import {
    alignLeft,
    alignRight,
    isHorizontallyOutOfViewport,
    isVerticallyOutOfViewport,
    placeAbove,
    placeBelow,
} from '@/utils/placement'

import useAutoUpdatePosition from './useAutoUpdatePosition'

const calculatePlacementStyle = (triggerRect: DOMRect, contentRect: DOMRect): PlacementStyle => {
    const top = !isVerticallyOutOfViewport(triggerRect, contentRect)
        ? placeBelow(triggerRect)
        : placeAbove(triggerRect, contentRect)

    const left = !isHorizontallyOutOfViewport(triggerRect, contentRect)
        ? alignLeft(triggerRect)
        : alignRight(triggerRect, contentRect)

    return { position: 'absolute', top, left }
}

const isEqualPlacementStyle = (prevStyle: PlacementStyle, nextStyle: PlacementStyle) => {
    return (
        prevStyle.top === nextStyle.top &&
        prevStyle.left === nextStyle.left &&
        prevStyle.position === nextStyle.position
    )
}

const useTooltipContentPlacement = (triggerRef: RefObject<HTMLElement | null>) => {
    const contentRef = useRef<HTMLDivElement | null>(null)
    const [style, setStyle] = useState<PlacementStyle>({
        position: 'absolute',
        top: 0,
        left: 0,
    })

    const updatePosition = () => {
        const $trigger = triggerRef.current
        const $content = contentRef.current

        if (!$trigger || !$content) return

        const triggerRect = $trigger.getBoundingClientRect()
        const contentRect = $content.getBoundingClientRect()

        setStyle(prevStyle => {
            const nextStyle = calculatePlacementStyle(triggerRect, contentRect)
            return isEqualPlacementStyle(prevStyle, nextStyle) ? prevStyle : nextStyle
        })
    }

    useAutoUpdatePosition(triggerRef, contentRef, updatePosition)

    return { contentRef, style }
}

export default useTooltipContentPlacement
