import type { ReactNode } from 'react'

import type {
    SelectionItemProps,
    SelectionItemRendererProps,
} from '@/features/selection/components/SelectionItem'
import SelectionItem from '@/features/selection/components/SelectionItem'

import cx from './cx'

type AccordionItemProps<T> = Omit<SelectionItemProps<T>, 'children'> & {
    children: ReactNode
}

const AccordionItem = <T,>({ value, children }: AccordionItemProps<T>) => {
    return (
        <SelectionItem value={value}>
            {({ isSelected }: SelectionItemRendererProps) => (
                <li className={cx('item', { 'is-open': isSelected })}>{children}</li>
            )}
        </SelectionItem>
    )
}

export default AccordionItem
