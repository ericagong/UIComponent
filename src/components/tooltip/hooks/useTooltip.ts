import { useCallback, useMemo, useRef } from 'react'

import type { UseTooltipOptions } from '../types'
import useDismiss from './useDismiss'
import useTooltipAccessibility from './useTooltipAccessibility'
import useTooltipActions from './useTooltipActions'

const useTooltip = (options: UseTooltipOptions = {}) => {
    const { isOpen, open, close, openWithDelay, closeWithDelay } = useTooltipActions(options)

    const triggerRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLElement>(null)
    useDismiss({
        isOpen,
        close,
        targetRefs: [triggerRef, contentRef],
    })

    const { getTriggerA11yProps, getContentA11yProps } = useTooltipAccessibility(isOpen)

    const getTriggerProps = useCallback(
        () => ({
            ...getTriggerA11yProps,
            ref: triggerRef,
            onMouseEnter: openWithDelay,
            onMouseLeave: closeWithDelay,
            onFocus: open,
            onBlur: close,
        }),
        [getTriggerA11yProps, openWithDelay, closeWithDelay, open, close]
    )

    const getContentProps = useCallback(
        () => ({
            ...getContentA11yProps,
            ref: contentRef,
        }),
        [getContentA11yProps]
    )

    return useMemo(
        () => ({
            isOpen,
            getTriggerProps,
            getContentProps,
        }),
        [isOpen, getTriggerProps, getContentProps]
    )
}

export default useTooltip
