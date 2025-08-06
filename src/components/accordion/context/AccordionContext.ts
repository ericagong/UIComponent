import { createContext } from 'react'

const AccordionContext = createContext<{
    openItemId: string | null
    toggleContent: (id: string) => void
}>({
    openItemId: null,
    toggleContent: () => {},
})

export default AccordionContext
