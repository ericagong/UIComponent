import { createContext, useCallback, useContext, useMemo } from 'react'

import ContextError from '@/utils/ContextError'

import type { AccordionActions, AccordionProviderProps, AccordionState } from '../types'

const AccordionStateContext = createContext<AccordionState | null>(null)
const AccordionActionsContext = createContext<AccordionActions | null>(null)

const useAccordionActionsContext = (): AccordionActions => {
    const context = useContext(AccordionActionsContext)

    if (!context) {
        throw new ContextError('useAccordionActionsContext', 'AccordionActionsContext')
    }

    return context
}

const useAccordionStateContext = (): AccordionState => {
    const context = useContext(AccordionStateContext)

    if (!context) {
        throw new ContextError('useAccordionStateContext', 'AccordionStateContext')
    }

    return context
}

const AccordionProvider = ({ children, openId, setOpenId }: AccordionProviderProps) => {
    const open = useCallback((id: string) => setOpenId(id), [setOpenId])
    const close = useCallback(() => setOpenId(null), [setOpenId])

    const actionsValue = useMemo(() => ({ open, close }), [open, close])
    const stateValue = useMemo(() => ({ openId }), [openId])

    return (
        <AccordionStateContext.Provider value={stateValue}>
            <AccordionActionsContext.Provider value={actionsValue}>
                {children}
            </AccordionActionsContext.Provider>
        </AccordionStateContext.Provider>
    )
}
AccordionProvider.displayName = 'AccordionProvider'

export default AccordionProvider
export { useAccordionActionsContext, useAccordionStateContext }
