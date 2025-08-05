// MultiOpenAccordion.tsx
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'

import cx from '../cx'

const AccordionStateContext = createContext<{
    openItemIds: string[]
    toggleItem: (id: string) => void
}>({
    openItemIds: [],
    toggleItem: () => {},
})

const useAccordionState = () => {
    const context = useContext(AccordionStateContext)
    if (!context) {
        throw new Error('Accordion은 AccordionProvider로 감싸져야 합니다.')
    }
    return context
}

const AccordionItemMetaContext = createContext<{
    id: string
    triggerId: string
    contentId: string
} | null>(null)

const useAccordionItemMeta = () => {
    const context = useContext(AccordionItemMetaContext)
    if (!context) {
        throw new Error(
            'Accordion.Trigger와 Accordion.Content는 Accordion.Item 내부에서 사용되어야 합니다.'
        )
    }
    return context
}

const Accordion = ({
    children,
    defaultOpenIds = [],
    className,
}: {
    children: ReactNode
    defaultOpenIds?: string[]
    className?: string
}) => {
    const [openItemIds, setOpenItemIds] = useState<string[]>(defaultOpenIds)

    const toggleItem = (id: string) => {
        setOpenItemIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]))
    }

    return (
        <AccordionStateContext.Provider value={{ openItemIds, toggleItem }}>
            <ul className={cx('accordion-root', className)}>{children}</ul>
        </AccordionStateContext.Provider>
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
    const { openItemIds } = useAccordionState()
    const isOpen = openItemIds.includes(id)

    const triggerId = `accordion_trigger_${id}`
    const contentId = `accordion_content_${id}`

    return (
        <AccordionItemMetaContext.Provider value={{ id, triggerId, contentId }}>
            <details className={cx('accordion-item', className)} open={isOpen}>
                {children}
            </details>
        </AccordionItemMetaContext.Provider>
    )
}

const AccordionTrigger = ({ children, className }: { children: ReactNode; className?: string }) => {
    const { toggleItem } = useAccordionState()
    const { id, triggerId, contentId } = useAccordionItemMeta()

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        toggleItem(id)
    }

    return (
        <summary
            className={cx('accordion-summary', className)}
            id={triggerId}
            aria-controls={contentId}
            onClick={handleClick}
        >
            {children}
        </summary>
    )
}

const AccordionContent = ({ children, className }: { children: ReactNode; className?: string }) => {
    const { openItemIds, toggleItem } = useAccordionState()
    const { id, triggerId, contentId } = useAccordionItemMeta()
    const isOpen = openItemIds.includes(id)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const $content = contentRef.current
        if (!$content) return
        const onBeforeMatch = () => toggleItem(id)

        $content.addEventListener('beforematch', onBeforeMatch)
        return () => $content.removeEventListener('beforematch', onBeforeMatch)
    }, [toggleItem, id])

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
