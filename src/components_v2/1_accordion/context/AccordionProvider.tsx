import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import ContextError from '@/utils/ContextError'

import type { AccordionActions, AccordionProviderProps, AccordionState } from '../types'

const AccordionActionsContext = createContext<AccordionActions | null>(null)
const AccordionStateContext = createContext<AccordionState | null>(null)

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

const AccordionProvider = ({ children }: AccordionProviderProps) => {
    const [openedItemId, setOpenedItemId] = useState<string | null>(null)

    const open = useCallback((id: string) => setOpenedItemId(id), [])
    const close = useCallback(() => setOpenedItemId(null), [])
    const toggle = useCallback((id: string | null) => setOpenedItemId(id), [])

    const actionsValue = useMemo(() => ({ open, close, toggle }), [open, close, toggle])
    const stateValue = useMemo(() => ({ openedItemId }), [openedItemId])

    return (
        <AccordionActionsContext.Provider value={actionsValue}>
            <AccordionStateContext.Provider value={stateValue}>
                {children}
            </AccordionStateContext.Provider>
        </AccordionActionsContext.Provider>
    )
}
AccordionProvider.displayName = 'AccordionProvider'

export default AccordionProvider
export { useAccordionActionsContext, useAccordionStateContext }
