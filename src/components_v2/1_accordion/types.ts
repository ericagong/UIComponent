import { ReactNode } from 'react'

import {
    SelectionContentProps,
    SelectionItemProps,
    SelectionRootProps,
    SelectionTriggerProps,
} from '@/features/selection/types'

type AccordionRootProps<T, M extends boolean> = SelectionRootProps<T, M>

type AccordionItemProps<T> = Omit<SelectionItemProps<T>, 'children'> & {
    children: ReactNode
}

type AccordionTriggerProps = Omit<SelectionTriggerProps, 'children'> & {
    children: React.ReactNode
}

type AccordionContentProps = Omit<SelectionContentProps, 'children'> & {
    children: ReactNode
}

export type { AccordionContentProps, AccordionItemProps, AccordionRootProps, AccordionTriggerProps }
