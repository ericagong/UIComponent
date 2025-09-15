import { ReactNode, useMemo } from 'react'

import {
    ItemIdentifierContext,
    useItemIdentifierRegister,
} from '@/features/common/useItemIdentifier'

import cx from './cx'

type AccordionItemProps<T> = {
    value: T
    children: ReactNode
} & {
    className?: string
}

const AccordionItem = <T,>({ value, className, children }: AccordionItemProps<T>) => {
    const { id } = useItemIdentifierRegister({ value })

    const identifier = useMemo(() => ({ id }), [id])

    return (
        <ItemIdentifierContext.Provider value={identifier}>
            <li className={cx('item', className)} data-value={value}>
                {children}
            </li>
        </ItemIdentifierContext.Provider>
    )
}

export default AccordionItem
