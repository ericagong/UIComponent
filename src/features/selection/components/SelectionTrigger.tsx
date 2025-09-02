import { useSelectionContext } from '../context/SelectionContext'
import { useSelectionItemContext } from '../context/SelectionItemContext'
import type { SelectionTriggerProps } from '../types'

const SelectionTrigger = ({ children }: SelectionTriggerProps) => {
    const { has, add, remove } = useSelectionContext()
    const { value } = useSelectionItemContext()
    const isSelected = has(value)

    const handleClick = () => {
        if (isSelected) remove(value)
        else {
            add(value)
        }
    }

    return <>{children({ onClick: handleClick })}</>
}

export default SelectionTrigger
