import { createContext, useContext } from 'react'

import type { Identifier } from '../types'

type IdentifierContextValue<T> = Identifier<T>

const IdentifierContext = createContext<IdentifierContextValue<any> | null>(null)

const useIdentifierContext = <T,>() => {
    const context = useContext(IdentifierContext)

    if (!context) {
        throw new Error('useIdentifierContext must be used within <IdentifierProvider>')
    }

    return context as IdentifierContextValue<T>
}

export default IdentifierContext
export { useIdentifierContext }
