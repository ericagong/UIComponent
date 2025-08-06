import { ReactNode, useState } from 'react'

import AccordionContext from '../context/AccordionContext'
import cx from '../cx'

const AccordionRoot = ({
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

export default AccordionRoot
