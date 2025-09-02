import SelectionItem from '@/features/selection/components/SelectionItem'
import type { SelectionItemProps } from '@/features/selection/types'

import cx from './cx'

type AccordionItemProps<T> = SelectionItemProps<T>

const AccordionItem = <T,>(props: AccordionItemProps<T>) => {
    const { ...selectionItemProps } = props

    return <SelectionItem<T> {...selectionItemProps} className={cx('item')} />
}

export default AccordionItem
