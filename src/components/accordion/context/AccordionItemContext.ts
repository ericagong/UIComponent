import { createContext } from 'react'

const AccordionItemContext = createContext<{
    id: string
    triggerId: string
    contentId: string
}>({ id: '', triggerId: '', contentId: '' })

export default AccordionItemContext
