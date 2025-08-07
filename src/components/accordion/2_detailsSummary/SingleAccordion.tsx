import { ReactNode, useCallback, useRef, useState } from 'react'

import AccordionContext, { useAccordionContext } from '../context/AccordionContext'
import AccordionItemContext, { useAccordionItemContext } from '../context/AccordionItemContext'
import cx from '../cx'
import useOnBeforeMatch from '../hooks/useOnBeforeMatch'

const Accordion = ({
    children,
    defaultOpenId = null,
    className,
}: {
    children: ReactNode
    defaultOpenId?: string | null
    className?: string
}) => {
    const [openItemId, setOpenItemId] = useState<string | null>(defaultOpenId)

    const toggleContent = (id: string) => {
        setOpenItemId(prev => (prev === id ? null : id))
    }

    return (
        <AccordionContext.Provider value={{ openItemId, toggleContent }}>
            <ul className={cx('accordion-root', className)}>{children}</ul>
        </AccordionContext.Provider>
    )
}

const AccordionItem = ({
    id,
    children,
    className,
}: {
    id: string
    children: ReactNode
    className?: string
}) => {
    const { openItemId } = useAccordionContext()
    const isOpen = openItemId === id
    const triggerId = `accordion_trigger_${id}`
    const contentId = `accordion_content_${id}`

    return (
        <AccordionItemContext.Provider value={{ id, triggerId, contentId }}>
            <details className={cx('accordion-item', className)} open={isOpen}>
                {children}
            </details>
        </AccordionItemContext.Provider>
    )
}

const AccordionTrigger = ({ children, className }: { children: ReactNode; className?: string }) => {
    const { openItemId, toggleContent } = useAccordionContext()
    const { id, triggerId, contentId } = useAccordionItemContext()
    const isOpen = openItemId === id

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault()
        toggleContent(id)
    }

    return (
        <summary
            className={cx('accordion-summary', className)}
            id={triggerId}
            aria-controls={contentId}
            aria-expanded={isOpen}
            onClick={handleClick}
        >
            {children}
        </summary>
    )
}

const AccordionContent = ({ children, className }: { children: ReactNode; className?: string }) => {
    const { openItemId, toggleContent } = useAccordionContext()
    const { id, triggerId, contentId } = useAccordionItemContext()
    const isOpen = openItemId === id
    const contentRef = useRef<HTMLDivElement>(null)

    const onBeforeMatch = useCallback(() => {
        toggleContent(id)
    }, [toggleContent, id])

    useOnBeforeMatch(contentRef, onBeforeMatch)

    return (
        <div
            className={cx('accordion-panel', className)}
            ref={contentRef}
            role="region"
            id={contentId}
            aria-labelledby={triggerId}
            aria-hidden={!isOpen}
        >
            {children}
        </div>
    )
}

Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent

export default Accordion
