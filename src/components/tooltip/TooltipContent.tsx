import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { useTooltipContext } from './context/TooltipContext'
import cx from './cx'
import useTooltipContentPlacement from './hooks/useTooltipContentPlacement'
import useTooltipHoverEvents from './hooks/useTooltipHoverEvents'

const TooltipContent = ({ children }: { children: ReactNode }) => {
    const { isOpen, triggerRef } = useTooltipContext()
    const hoverEvents = useTooltipHoverEvents()

    const { contentRef, style } = useTooltipContentPlacement(triggerRef)

    if (!isOpen) return null

    return createPortal(
        <div
            ref={contentRef}
            style={{
                position: 'absolute',
                top: style.top,
                left: style.left,
            }}
            className={cx('tooltip-content', { 'is-open': isOpen })}
            {...hoverEvents}
        >
            {children}
        </div>,
        document.body
    )
}

export default TooltipContent
