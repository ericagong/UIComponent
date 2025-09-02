import SelectionTrigger from '@/features/selection/components/SelectionTrigger'
import type { SelectionTriggerProps } from '@/features/selection/types'

import cx from './cx'

type AccordionTriggerProps = SelectionTriggerProps

const AccordionTrigger = (props: AccordionTriggerProps) => {
    const { ...triggerProps } = props

    return <SelectionTrigger {...triggerProps} className={cx('trigger')} />
}

export default AccordionTrigger
