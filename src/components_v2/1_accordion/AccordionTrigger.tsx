import type { ReactNode } from 'react'

import type {
    SelectionTriggerProps,
    SelectionTriggerRenderProps,
} from '@/features/selection/components/SelectionTrigger'
import SelectionTrigger from '@/features/selection/components/SelectionTrigger'

import cx from './cx'

type AccordionTriggerProps = Omit<SelectionTriggerProps, 'children'> & {
    children: ReactNode
}

const AccordionTrigger = (props: AccordionTriggerProps) => {
    return (
        <SelectionTrigger>
            {({ onClick }: SelectionTriggerRenderProps) => (
                <button {...props} onClick={onClick} className={cx('trigger')}>
                    {props.children}
                </button>
            )}
        </SelectionTrigger>
    )
}

export default AccordionTrigger
