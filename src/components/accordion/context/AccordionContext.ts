import { createContext, useContext } from 'react'

import ContextError from '@/utils/ContextError'

type AccordionContextType = {
    openItemId: string | null
    toggleContent: (id: string) => void
}

const AccordionContext = createContext<AccordionContextType | null>(null)

const useAccordionContext = (): AccordionContextType => {
    const context = useContext(AccordionContext)

    if (!context) {
        throw new ContextError('useAccordionContext', 'AccordionContext')
    }

    return context
}

export default AccordionContext
export { useAccordionContext }
export type { AccordionContextType }
