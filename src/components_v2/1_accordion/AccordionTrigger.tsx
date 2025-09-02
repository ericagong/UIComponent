import SelectionTrigger from '@/features/selection/components/SelectionTrigger'

import cx from './cx'
import type { AccordionTriggerProps } from './types'

const AccordionTrigger = (props: AccordionTriggerProps) => {
    return (
        <SelectionTrigger>
            {({ onClick }) => (
                <button {...props} onClick={onClick} className={cx('trigger')}>
                    {props.children}
                </button>
            )}
        </SelectionTrigger>
    )
}

export default AccordionTrigger
