import { useMemo } from 'react'

import type { SelectionItemProviderProps } from '../types'
import SelectionItemContext from './SelectionItemContext'

const SelectionItemProvider = <T,>({ value, children }: SelectionItemProviderProps<T>) => {
    const contextValue = useMemo(() => ({ value }), [value])

    return (
        <SelectionItemContext.Provider value={contextValue}>
            {children}
        </SelectionItemContext.Provider>
    )
}

export default SelectionItemProvider
