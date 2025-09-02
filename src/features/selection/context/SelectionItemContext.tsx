import { createContext, useContext } from 'react'

import type { SelectionItemContextValue } from '../types'

const SelectionItemContext = createContext<SelectionItemContextValue<any> | null>(null)

const useSelectionItemContext = <T,>() => {
    const context = useContext(SelectionItemContext)
    if (!context) {
        throw new Error('useSelectionItemContext must be used within <SelectionProvider>')
    }
    return context as SelectionItemContextValue<T>
}

export default SelectionItemContext
export { useSelectionItemContext }
