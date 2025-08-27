import { ReactNode } from 'react'

type AccordionActions = {
    open: (id: string) => void
    close: () => void
    toggle: (id: string | null) => void
}

type AccordionState = {
    openedItemId: string | null
}

type AccordionProviderProps = {
    children: ReactNode
}

type AccordionRootProps = {
    children: ReactNode
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
