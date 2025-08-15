import { createContext, useContext } from 'react'

import ContextError from '@/utils/ContextError'

import useTooltip from '../hooks/useTooltip'

type TooltipContextType = {
    tooltip: ReturnType<typeof useTooltip>
}

const TooltipContext = createContext<TooltipContextType | null>(null)

const useTooltipContext = (): TooltipContextType => {
    const context = useContext(TooltipContext)

    if (!context) {
        throw new ContextError('useTooltipContext', 'TooltipContext')
    }

    return context
}

export default TooltipContext
export { useTooltipContext }
export type { TooltipContextType }
