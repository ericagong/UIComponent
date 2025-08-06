import { useContext } from 'react'

import { throwContextError } from '@/utils/ContextError'

import AccordionItemContext from '../context/AccordionItemContext'

const useAccordionItem = () => {
    const context = useContext(AccordionItemContext)
    if (!context) {
        throwContextError('useAccordionItem', 'AccordionItemContext')
    }

    return context
}

export default useAccordionItem
