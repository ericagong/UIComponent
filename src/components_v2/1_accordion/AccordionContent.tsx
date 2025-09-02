import SelectionContent from '@/features/selection/components/SelectionContent'
import type { SelectionContentProps } from '@/features/selection/types'

import cx from './cx'

type AccordionContentProps = SelectionContentProps

const AccordionContent = (props: AccordionContentProps) => {
    const { ...contentProps } = props

    return <SelectionContent {...contentProps} className={cx('content')} />
}

export default AccordionContent
