import { JSX } from 'react'

import type { SelectionRootProps } from '@/features/selection/components/SelectionRoot'
import SelectionRoot from '@/features/selection/components/SelectionRoot'

import cx from './cx'

type AccordionRootProps<T> = SelectionRootProps<T>

const AccordionRoot = <T,>(props: AccordionRootProps<T>): JSX.Element => {
    return (
        <SelectionRoot {...props}>
            <ul className={cx('root')}>{props.children}</ul>
        </SelectionRoot>
    )
}

export default AccordionRoot
