import { createContext, RefObject, useContext } from 'react'

import ContextError from '@/utils/ContextError'

type TabContextType = {
    openIndex: number
    openTab: (index: number) => void
    tabRefs: RefObject<(HTMLButtonElement | null)[]>
}

const TabsContext = createContext<TabContextType | null>(null)

const useTabsContext = () => {
    const context = useContext(TabsContext)

    if (!context) throw new ContextError('useTabsContext', 'TabsContext')

    return context
}

export default TabsContext
export { useTabsContext }
export type { TabContextType }
