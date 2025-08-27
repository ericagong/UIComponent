import { useRef } from 'react'

import useHiddenFound from '@/hooks_v2/level2/useHiddenFound'

import { useAccordionItemStateContext } from './context/AccordionItemProvider'
import { useAccordionActionsContext, useAccordionStateContext } from './context/AccordionProvider'
import cx from './cx'
import { AccordionContentProps } from './types'

const AccordionContent = ({ children }: AccordionContentProps) => {
    const { openedItemId } = useAccordionStateContext()
    const { id, triggerId, contentId } = useAccordionItemStateContext()

    const contentRef = useRef<HTMLDivElement>(null)
    const { toggle } = useAccordionActionsContext()
    const isOpened = openedItemId === id
    useHiddenFound(contentRef, isOpened, () => toggle(id))

    return (
        <div
            className={cx('content')}
            ref={contentRef}
            id={contentId}
            aria-labelledby={triggerId}
            aria-hidden={!isOpened}
        >
            {children}
        </div>
    )
}

export default AccordionContent
