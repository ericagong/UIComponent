import { createContext } from 'react'

type AccordionItemContextType = {
    id: string
    triggerId: string
    contentId: string
}

const AccordionItemContext = createContext<AccordionItemContextType | null>(null)

import { useContext } from 'react'

import ContextError from '@/utils/ContextError'

const useAccordionItemContext = (): AccordionItemContextType => {
    const context = useContext(AccordionItemContext)

    if (!context) throw new ContextError('useAccordionItemContext', 'AccordionItemContext')

    return context
}

export default AccordionItemContext
export { useAccordionItemContext }
export type { AccordionItemContextType }
