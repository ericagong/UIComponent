import SelectionRoot from '@/features/selection/components/SelectionRoot'
import type { SelectionRootProps } from '@/features/selection/types'

import cx from './cx'

type AccordionRootProps<T> = SelectionRootProps<T>

function AccordionRoot<T>(props: AccordionRootProps<T>) {
    const { ...selectionProps } = props

    return (
        <SelectionRoot<T> {...selectionProps}>
            <ul className={cx('root')}>{props.children}</ul>
        </SelectionRoot>
    )
}

export default AccordionRoot
