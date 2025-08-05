import { ReactNode, useCallback, useRef } from 'react'

import cx from '../cx'
import useAccordion from '../hooks/useAccordion'
import useAccordionItem from '../hooks/useAccordionItem'
import useOnBeforeMatch from '../hooks/useOnBeforeMatch'
import useUntilFound from '../hooks/useUntilFound'

const AccordionContent = ({ children, className }: { children: ReactNode; className?: string }) => {
    const { openItemId, toggleItem } = useAccordion()
    const { id, triggerId, contentId } = useAccordionItem()

    const contentRef = useRef<HTMLDivElement>(null)
    const isOpen = openItemId === id

    useUntilFound(contentRef, isOpen)

    const onBeforeMatch = useCallback(() => {
        toggleItem(id)
    }, [toggleItem, id])

    useOnBeforeMatch(contentRef, onBeforeMatch)

    return (
        <div
            className={cx('accordion-content', className)}
            ref={contentRef}
            id={contentId}
            aria-labelledby={triggerId}
            aria-hidden={!isOpen}
        >
            {children}
        </div>
    )
}

export default AccordionContent
