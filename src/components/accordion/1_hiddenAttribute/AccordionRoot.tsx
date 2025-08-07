import { ReactNode, useCallback, useMemo, useState } from 'react'

import AccordionContext from '../context/AccordionContext'
import cx from '../cx'

// TODO context를 위한 로직 분리
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

    const toggleContent = useCallback((id: string) => {
        setOpenItemId(prev => (prev === id ? null : id))
    }, [])

    const contextValue = useMemo(() => ({ openItemId, toggleContent }), [openItemId, toggleContent])

    return (
        <AccordionContext.Provider value={contextValue}>
            <ul className={cx('accordion-root', className)}>{children}</ul>
        </AccordionContext.Provider>
    )
}

export default AccordionRoot
