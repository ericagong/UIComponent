import { ReactNode, useMemo } from 'react'

import {
    ItemIdentifierContext,
    useItemIdentifierRegister,
} from '@/features/common/useItemIdentifier'

type AccordionItemProps<T> = {
    value: T
    children: ReactNode
}

const AccordionItem = <T,>({ value, children }: AccordionItemProps<T>) => {
    const { id } = useItemIdentifierRegister({ value })

    const identifier = useMemo(() => ({ id }), [id])

    return (
        <ItemIdentifierContext.Provider value={identifier}>
            <div data-value={value}>{children}</div>
        </ItemIdentifierContext.Provider>
    )
}

export default AccordionItem
