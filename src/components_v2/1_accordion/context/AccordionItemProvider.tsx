import { createContext, useContext, useMemo } from 'react'

import ContextError from '@/utils/ContextError'

import type { AccordionItemProviderProps, AccordionItemState } from '../types'

const AccordionItemContext = createContext<AccordionItemState | null>(null)

const useAccordionItemStateContext = (): AccordionItemState => {
    const context = useContext(AccordionItemContext)

    if (!context) {
        throw new ContextError('useAccordionItemContext', 'AccordionItemContext')
    }

    return context
}

const AccordionItemProvider = ({ id, children }: AccordionItemProviderProps) => {
    const ids = useMemo(() => {
        return {
            id,
            triggerId: `accordion_trigger_${id}`,
            contentId: `accordion_content_${id}`,
        }
    }, [id])

    return <AccordionItemContext.Provider value={ids}>{children}</AccordionItemContext.Provider>
}
AccordionItemProvider.displayName = 'AccordionItemProvider'

export default AccordionItemProvider
export { useAccordionItemStateContext }
