import { ReactNode } from 'react'

import { useAccordionContext } from './context/AccordionContext'
import { useAccordionItemContext } from './context/AccordionItemContext'
import cx from './cx'

const AccordionTrigger = ({ children, className }: { children: ReactNode; className?: string }) => {
    const { isItemOpen, toggleAccordionItem } = useAccordionContext()

    const { id, triggerId, contentId } = useAccordionItemContext()

    return (
        <button
            className={cx('accordion-trigger', className)}
            id={triggerId}
            aria-controls={contentId}
            aria-expanded={isItemOpen(id)}
            onClick={() => toggleAccordionItem(id)}
        >
            {children}
        </button>
    )
}

export default AccordionTrigger
