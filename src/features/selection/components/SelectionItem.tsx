import type { ReactNode } from 'react'

import { useActionsContext } from '../context/ActionsContext'
import SelectionItemProvider from '../context/IdentifierProvider'
import type { Identifier } from '../types'

type SelectionItemRendererProps = {
    isSelected: boolean
}

type SelectionItemProps<T> = Identifier<T> & {
    children: (props: SelectionItemRendererProps) => ReactNode
}

const SelectionItem = <T,>({ value, children }: SelectionItemProps<T>) => {
    const { isSelected } = useActionsContext<T>()

    return (
        <SelectionItemProvider value={value}>
            {children({ isSelected: isSelected(value) })}
        </SelectionItemProvider>
    )
}

export default SelectionItem
export type { SelectionItemProps, SelectionItemRendererProps }
