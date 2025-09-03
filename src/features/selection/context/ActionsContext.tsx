import { createContext, useContext } from 'react'

import type { Actions } from '../types'

type ActionsContext<T> = Actions<T>

const ActionsContext = createContext<ActionsContext<any> | null>(null)

const useActionsContext = <T,>() => {
    const context = useContext(ActionsContext)

    if (!context) {
        throw new Error('useActionsContext must be used within <Root>')
    }

    return context as ActionsContext<T>
}

export default ActionsContext
export { useActionsContext }
