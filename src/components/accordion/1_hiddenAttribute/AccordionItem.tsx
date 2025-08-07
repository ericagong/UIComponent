import { ReactNode, useMemo } from 'react'

import { useAccordionContext } from '../context/AccordionContext'
import AccordionItemContext from '../context/AccordionItemContext'
import cx from '../cx'

const AccordionItem = ({
    id,
    children,
    className,
}: {
    id: string
    children: ReactNode
    className?: string
}) => {
    const triggerId = `accordion_trigger_${id}`
    const contentId = `accordion_content_${id}`
    const contextValue = useMemo(() => ({ id, triggerId, contentId }), [id, triggerId, contentId])

    const { openItemId } = useAccordionContext()
    const isOpen = openItemId === id

    return (
        <AccordionItemContext.Provider value={contextValue}>
            <li className={cx('accordion-item', className, { 'is-open': isOpen })}>{children}</li>
        </AccordionItemContext.Provider>
    )
}

export default AccordionItem
