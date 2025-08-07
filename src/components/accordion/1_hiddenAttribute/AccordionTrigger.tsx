import { ReactNode } from 'react'

import { useAccordionContext } from '../context/AccordionContext'
import { useAccordionItemContext } from '../context/AccordionItemContext'
import cx from '../cx'

const AccordionTrigger = ({ children, className }: { children: ReactNode; className?: string }) => {
    const { openItemId, toggleContent } = useAccordionContext()

    const { id, triggerId, contentId } = useAccordionItemContext()

    const isOpen = openItemId === id

    return (
        <button
            className={cx('accordion-trigger', className)}
            id={triggerId}
            aria-controls={contentId}
            aria-expanded={isOpen}
            onClick={() => toggleContent(id)}
        >
            {children}
        </button>
    )
}

export default AccordionTrigger
