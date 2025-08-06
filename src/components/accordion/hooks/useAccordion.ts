import { useContext } from 'react'

import { throwContextError } from '@/utils/ContextError'

import AccordionContext from '../context/AccordionContext'

const useAccordion = () => {
    const context = useContext(AccordionContext)
    if (!context) {
        throwContextError('useAccordion', 'AccordionContext')
    }

    return context
}

export default useAccordion
