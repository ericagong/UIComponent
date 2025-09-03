import type { ReactNode } from 'react'
import { useMemo } from 'react'

import type { Identifier } from '../types'
import SelectionItemContext from './IdentifierContext'

type IdentifierProviderProps<T> = Identifier<T> & {
    children: ReactNode
}

const SelectionItemProvider = <T,>({ value, children }: IdentifierProviderProps<T>) => {
    const contextValue = useMemo(() => ({ value }), [value])

    return (
        <SelectionItemContext.Provider value={contextValue}>
            {children}
        </SelectionItemContext.Provider>
    )
}

export default SelectionItemProvider
