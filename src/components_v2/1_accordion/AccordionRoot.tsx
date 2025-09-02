import { JSX } from 'react'

import SelectionRoot from '@/features/selection/components/SelectionRoot'

import cx from './cx'
import type { AccordionRootProps } from './types'

function AccordionRoot<T>(props: AccordionRootProps<T, true>): JSX.Element

function AccordionRoot<T>(props: AccordionRootProps<T, false>): JSX.Element

function AccordionRoot<T, M extends boolean>(props: AccordionRootProps<T, M>): JSX.Element {
    const { ...selectionProps } = props

    return (
        <SelectionRoot {...selectionProps}>
            <ul className={cx('root')}>{props.children}</ul>
        </SelectionRoot>
    )
}

export default AccordionRoot
