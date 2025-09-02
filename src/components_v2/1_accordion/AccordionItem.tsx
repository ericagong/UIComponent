import SelectionItem from '@/features/selection/components/SelectionItem'

import cx from './cx'
import type { AccordionItemProps } from './types'

const AccordionItem = <T,>(props: AccordionItemProps<T>) => {
    const { ...selectionItemProps } = props

    return (
        <SelectionItem {...selectionItemProps}>
            {({ isSelected }) => (
                <li className={cx('item', { 'is-open': isSelected })}>{props.children}</li>
            )}
        </SelectionItem>
    )
}

export default AccordionItem
