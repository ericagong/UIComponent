import cx from 'clsx'

import { useSelectionContext } from '../context/SelectionContext'
import SelectionItemProvider from '../context/SelectionItemProvider'
import type { SelectionItemProps } from '../types'

const SelectionItem = <T,>({ value, children, className, ...rest }: SelectionItemProps<T>) => {
    const { has } = useSelectionContext<T>()
    const isSelected = has(value)

    return (
        <SelectionItemProvider value={value}>
            <div className={cx(className, { isOpen: isSelected })} {...rest}>
                {children}
            </div>
        </SelectionItemProvider>
    )
}

export default SelectionItem
