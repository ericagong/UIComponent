import { ReactNode } from 'react'

import AccordionItemContext from '../context/AccordionItemContext'
import cx from '../cx'
import useAccordion from '../hooks/useAccordion'

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
            <li className={cx('accordion-item', className, { 'is-open': isOpen })}>{children}</li>
        </AccordionItemContext.Provider>
    )
}

export default AccordionItem
