import SelectionContent from '@/features/selection/components/SelectionContent'

import cx from './cx'
import type { AccordionContentProps } from './types'

const AccordionContent = (props: AccordionContentProps) => {
    return (
        <SelectionContent {...props}>
            {({ ref }) => (
                <div ref={ref} className={cx('content')}>
                    {props.children}
                </div>
            )}
        </SelectionContent>
    )
}

export default AccordionContent
