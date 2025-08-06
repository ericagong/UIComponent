import { ReactNode } from 'react'

import cx from '../cx'
import useAccordion from '../hooks/useAccordion'
import useAccordionItem from '../hooks/useAccordionItem'

const AccordionTrigger = ({ children, className }: { children: ReactNode; className?: string }) => {
    const { openItemId, toggleContent } = useAccordion()

    const { id, triggerId, contentId } = useAccordionItem()

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
