import { ReactNode } from 'react'

type AccordionRootProps<T> = {
    value?: T | T[] | null
    defaultValue?: T | T[] | null
    onValueChange?: (value: T | T[] | null) => void
    multiple?: boolean
    children: ReactNode
}

export type { AccordionRootProps }
