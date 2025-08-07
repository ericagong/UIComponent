import { ReactNode, useCallback, useRef } from 'react'

import { useAccordionContext } from './context/AccordionContext'
import { useAccordionItemContext } from './context/AccordionItemContext'
import cx from './cx'
import useOnBeforeMatch from './hooks/useOnBeforeMatch'
import useUntilFound from './hooks/useUntilFound'

const AccordionContent = ({ children, className }: { children: ReactNode; className?: string }) => {
    const { isItemOpen, toggleAccordionItem } = useAccordionContext()
    const { id, triggerId, contentId } = useAccordionItemContext()

    const contentRef = useRef<HTMLDivElement>(null)
    const isOpen = isItemOpen(id)

    useUntilFound(contentRef, isOpen)

    const handleBeforeMatch = useCallback(() => {
        toggleAccordionItem(id)
    }, [toggleAccordionItem, id])

    useOnBeforeMatch(contentRef, handleBeforeMatch)

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
