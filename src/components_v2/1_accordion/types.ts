import { ReactNode } from 'react'

type AccordionRootProps = {
    value?: string | null
    defaultValue?: string | null
    onValueChange?: (value: string | null) => void
    children: ReactNode
}

type AccordionProviderProps = {
    openId?: string | null
    setOpenId: (id: string | null) => void
    children: ReactNode
}

type AccordionState = {
    openId?: string | null
}

type AccordionActions = {
    open: (id: string) => void
    close: () => void
}

type AccordionItemState = {
    id: string | null
    triggerId: string
    contentId: string
}

type AccordionItemProviderProps = {
    id: string | null
    children: ReactNode
}

type AccordionItemProps = {
    id: string | null
    children: ReactNode
}

type AccordionTriggerProps = {
    children: ReactNode
}

type AccordionContentProps = {
    children: ReactNode
}

export type {
    AccordionActions,
    AccordionContentProps,
    AccordionItemProps,
    AccordionItemProviderProps,
    AccordionItemState,
    AccordionProviderProps,
    AccordionRootProps,
    AccordionState,
    AccordionTriggerProps,
}
