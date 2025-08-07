import { ReactNode, useRef } from 'react'

import useSearchReveal from '@/components/hooks/useSearchReveal'

import { useAccordionContext } from './context/AccordionContext'
import { useAccordionItemContext } from './context/AccordionItemContext'
import cx from './cx'

const AccordionContent = ({ children, className }: { children: ReactNode; className?: string }) => {
    const { isItemOpen, toggleAccordionItem } = useAccordionContext()
    const { id, triggerId, contentId } = useAccordionItemContext()

    const contentRef = useRef<HTMLDivElement>(null)
    const isOpen = isItemOpen(id)

    useSearchReveal(contentRef, isOpen, () => {
        toggleAccordionItem(id)
    })

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
