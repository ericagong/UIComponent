import { useContext } from 'react'

import { throwContextError } from '@/utils/ContextError'

import TabsContext from '../context/TabsContext'

const useTabsContext = () => {
    const context = useContext(TabsContext)
    if (!context) throwContextError('useTabsContext', 'TabsContext')
    return context
}

export default useTabsContext
