import cx from 'clsx'

import { useSelectionContext } from '../context/SelectionContext'
import { useSelectionItemContext } from '../context/SelectionItemContext'
import type { SelectionTriggerProps } from '../types'

const SelectionTrigger = ({ children, className, ...rest }: SelectionTriggerProps) => {
    const { has, add, remove, value: selectedValue } = useSelectionContext()
    const { value } = useSelectionItemContext()
    const isSelected = has(value)

    const handleClick = () => {
        if (isSelected) remove(value)
        else {
            add(value)
        }
    }

    return (
        <button className={cx(className)} {...rest} onClick={handleClick}>
            {children}
        </button>
    )
}

export default SelectionTrigger
