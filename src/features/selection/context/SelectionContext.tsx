import { createContext, useContext } from 'react'

import type { SelectionContextValue } from '../types'

const SelectionContext = createContext<SelectionContextValue<any> | null>(null)

const useSelectionContext = <T,>() => {
    const context = useContext(SelectionContext)
    if (!context) {
        throw new Error('useSelectionContext must be used within <SelectionProvider>')
    }
    return context as SelectionContextValue<T>
}

export default SelectionContext
export { useSelectionContext }
