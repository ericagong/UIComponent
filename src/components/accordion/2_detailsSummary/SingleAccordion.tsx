import { ReactNode, useCallback, useRef, useState } from 'react'

import AccordionContext from '../context/AccordionContext'
import AccordionItemContext from '../context/AccordionItemContext'
import cx from '../cx'
import useAccordion from '../hooks/useAccordion'
import useAccordionItem from '../hooks/useAccordionItem'
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

    const toggleItem = (id: string) => {
        setOpenItemId(prev => (prev === id ? null : id))
    }

    return (
        <AccordionContext.Provider value={{ openItemId, toggleItem }}>
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
    const { openItemId } = useAccordion()
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
    const { openItemId, toggleItem } = useAccordion()
    const { id, triggerId, contentId } = useAccordionItem()
    const isOpen = openItemId === id

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault()
        toggleItem(id)
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
    const { openItemId, toggleItem } = useAccordion()
    const { id, triggerId, contentId } = useAccordionItem()
    const isOpen = openItemId === id
    const contentRef = useRef<HTMLDivElement>(null)

    const onBeforeMatch = useCallback(() => {
        toggleItem(id)
    }, [toggleItem, id])

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
