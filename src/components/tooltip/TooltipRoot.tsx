import type { ReactNode } from 'react'
import { useMemo, useRef } from 'react'

import TooltipContext from './context/TooltipContext'
import cx from './cx'
import useTooltipVisibility from './hooks/useTooltipVisibility'

const TooltipRoot = ({ children }: { children: ReactNode }) => {
    const { isOpen, requestOpen, requestClose, requestOpenWithDelay, requestCloseWithDelay } =
        useTooltipVisibility()
    const triggerRef = useRef<HTMLElement | null>(null)

    const contextValue = useMemo(
        () => ({
            isOpen,
            requestOpen,
            requestClose,
            requestOpenWithDelay,
            requestCloseWithDelay,
            triggerRef,
        }),
        [isOpen, requestOpen, requestClose, requestOpenWithDelay, requestCloseWithDelay, triggerRef]
    )

    return (
        <div className={cx('tooltip-root')}>
            <TooltipContext.Provider value={contextValue}>{children}</TooltipContext.Provider>
        </div>
    )
}

export default TooltipRoot
