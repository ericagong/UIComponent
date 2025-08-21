import { cloneElement, isValidElement } from 'react'

import { useTooltipContext } from './context/TooltipContext'
import useTooltipFocusEvents from './hooks/useTooltipFocusEvents'
import useTooltipHoverEvents from './hooks/useTooltipHoverEvents'

type TooltipTriggerProps = {
    children: React.ReactElement
}

const TooltipTrigger = ({ children }: TooltipTriggerProps) => {
    const { triggerRef } = useTooltipContext()
    const hoverEvents = useTooltipHoverEvents()
    const focusEvents = useTooltipFocusEvents()

    if (!isValidElement(children)) {
        throw new Error('TooltipTrigger expects a single valid React element as child')
    }

    return cloneElement(children, {
        ref: triggerRef,
        ...hoverEvents,
        ...focusEvents,
    } as React.DOMAttributes<HTMLElement>)
}

export default TooltipTrigger
