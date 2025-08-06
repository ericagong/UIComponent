import { createContext, RefObject } from 'react'

const TabsContext = createContext<{
    openIndex: number
    setOpenIndex: (index: number) => void
    tabRefs: RefObject<(HTMLButtonElement | null)[]>
}>({
    openIndex: 0,
    setOpenIndex: () => {},
    tabRefs: { current: [] },
})

export default TabsContext
