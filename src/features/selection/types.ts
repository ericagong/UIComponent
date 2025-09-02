import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type SingleSelectionRootProps<T> = {
    multiple?: false
    value?: T | null
    defaultValue?: T | null
    onValueChange?: (value: T | null) => void
    children: ReactNode
}

type MultiSelectionRootProps<T> = {
    multiple: true
    value?: T[] | null
    defaultValue?: T[] | null
    onValueChange?: (value: T[] | null) => void
    children: ReactNode
}

type SelectionRootProps<T> = SingleSelectionRootProps<T> | MultiSelectionRootProps<T>

type SelectionProviderProps<T> = {
    multiple: boolean
    value: T | T[] | null
    defaultValue: T | T[] | null
    onValueChange?: (value: T | T[] | null) => void
    children: ReactNode
}

type UseSelectionParams<T> = {
    multiple?: boolean
    value?: T | T[] | null
    defaultValue?: T | T[] | null
    onValueChange?: (next: T | T[] | null) => void
}

type SelectionContextValue<T> = {
    // multiple: boolean
    value: T | T[] | null
    has: (target: T) => boolean
    add: (target: T) => void
    remove: (target: T) => void
}

type SelectionItemProviderProps<T> = {
    value: T
    children: ReactNode
}

type SelectionItemContextValue<T> = {
    value: T
}

type SelectionItemProps<T> = {
    value: T
    children: ReactNode
} & ComponentPropsWithoutRef<'div'>

type SelectionTriggerProps = ComponentPropsWithoutRef<'button'>

type SelectionContentProps = ComponentPropsWithoutRef<'div'>

export type {
    MultiSelectionRootProps,
    SelectionContentProps,
    SelectionContextValue,
    SelectionItemContextValue,
    SelectionItemProps,
    SelectionItemProviderProps,
    SelectionProviderProps,
    SelectionRootProps,
    SelectionTriggerProps,
    SingleSelectionRootProps,
    UseSelectionParams,
}
