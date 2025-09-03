import type { ReactNode } from 'react'

import type {
    SelectionContentProps,
    SelectionContentRenderProps,
} from '@/features/selection/components/SelectionContent'
import SelectionContent from '@/features/selection/components/SelectionContent'

import cx from './cx'

type AccordionContentProps = Omit<SelectionContentProps, 'children'> & {
    children: ReactNode
}

const AccordionContent = (props: AccordionContentProps) => {
    return (
        <SelectionContent {...props}>
            {({ ref }: SelectionContentRenderProps) => (
                <div ref={ref} className={cx('content')}>
                    {props.children}
                </div>
            )}
        </SelectionContent>
    )
}

export default AccordionContent
