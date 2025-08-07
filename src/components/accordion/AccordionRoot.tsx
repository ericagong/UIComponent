import { ReactNode, useCallback, useMemo, useState } from 'react'

import AccordionContext from './context/AccordionContext'
import cx from './cx'

type OpenStrategyHandler = (prev: Set<string>, id: string) => Set<string>

const singleOpenStrategyHandler: OpenStrategyHandler = (prev, id) => {
    const isAlreadyOpen = prev.has(id)
    return isAlreadyOpen ? new Set() : new Set([id])
}

const multipleOpenStrategyHandler: OpenStrategyHandler = (prev, id) => {
    const isOpen = prev.has(id)

    const next = new Set(prev)
    if (isOpen) next.delete(id)
    else next.add(id)

    return next
}

const resolveOpenStrategyHandler = (isMultiple: boolean): OpenStrategyHandler => {
    return isMultiple ? multipleOpenStrategyHandler : singleOpenStrategyHandler
}

type AccordionRootProps = {
    children: ReactNode
    defaultOpenId?: string | null
    className?: string
    multiple?: boolean
}

// TODO context를 위한 로직(useMemo, useCallback 등)과 컴포넌트 메인 로직 분리
const AccordionRoot = ({
    children,
    defaultOpenId = null,
    className,
    multiple: isMultiple = false,
}: AccordionRootProps) => {
    const [openItemIds, setOpenItemIds] = useState(
        () => new Set(defaultOpenId ? [defaultOpenId] : [])
    )

    const toggleAccordionItem = useCallback(
        (id: string) => {
            const openHandler = resolveOpenStrategyHandler(isMultiple)
            setOpenItemIds(prev => openHandler(prev, id))
        },
        [isMultiple]
    )

    const isItemOpen = useCallback((id: string) => openItemIds.has(id), [openItemIds])

    const contextValue = useMemo(
        () => ({ toggleAccordionItem, isItemOpen }),
        [toggleAccordionItem, isItemOpen]
    )

    return (
        <AccordionContext.Provider value={contextValue}>
            <ul className={cx('accordion-root', className)}>{children}</ul>
        </AccordionContext.Provider>
    )
}

export default AccordionRoot
