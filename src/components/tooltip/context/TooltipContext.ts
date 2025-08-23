import { createContext, RefObject, useContext } from 'react'

import ContextError from '@/utils/ContextError'

type TooltipContext = {
    isOpen: boolean
    requestOpen: () => void
    requestClose: () => void
    requestOpenWithDelay: () => void
    requestCloseWithDelay: () => void
    triggerRef: RefObject<HTMLElement>
}

const TooltipContext = createContext<TooltipContext | null>(null)

const useTooltipContext = (): TooltipContext => {
    const context = useContext(TooltipContext)

    if (!context) {
        throw new ContextError('useTooltipContext', 'TooltipContext')
    }

    return context
}

export default TooltipContext
export { useTooltipContext }
export type { TooltipContext }
