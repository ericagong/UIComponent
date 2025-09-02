import { useSelectionContext } from '../context/SelectionContext'
import SelectionItemProvider from '../context/SelectionItemProvider'
import type { SelectionItemProps } from '../types'

const SelectionItem = <T,>({ value, children }: SelectionItemProps<T>) => {
    const { has } = useSelectionContext<T>()
    const isSelected = has(value)

    return <SelectionItemProvider value={value}>{children({ isSelected })}</SelectionItemProvider>
}

export default SelectionItem
