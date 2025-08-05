import { createContext } from 'react'

const AccordionContext = createContext<{
    openItemId: string | null
    toggleItem: (id: string) => void
}>({
    openItemId: null,
    toggleItem: () => {},
})

export default AccordionContext
