import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { useTooltipContext } from './context/TooltipContext'
import cx from './cx'
import useTooltipContentPlacement from './hooks/useTooltipContentPlacement'
import useTooltipHoverEvents from './hooks/useTooltipHoverEvents'

const TooltipContent = ({ children }: { children: ReactNode }) => {
    const [mounted, setMounted] = useState(false)

    const { isOpen, triggerRef } = useTooltipContext()
    const hoverEvents = useTooltipHoverEvents()

    const { contentRef, style } = useTooltipContentPlacement(triggerRef)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    return createPortal(
        <div
            ref={contentRef}
            style={style}
            className={cx('content', { 'is-open': isOpen })}
            {...hoverEvents}
        >
            {children}
        </div>,
        document.body
    )
}

export default TooltipContent
