import { createContext, useContext } from 'react'

type SelectionContextValue<T> = {
    isSelected: (v: T) => boolean
    select: (v: T) => void
    unselect: (v?: T) => void
}

const SelectionContext = createContext<SelectionContextValue<any> | null>(null)

const useSelectionActions = <T>() => {
    const ctx = useContext(SelectionContext)
    if (!ctx) throw new Error('useSelectionContext must be used within SelectionProvider')
    return ctx as SelectionContextValue<T>
}

export { SelectionContext }
export default useSelectionActions
