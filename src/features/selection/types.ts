import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'

type SelectionRootProps<T, M extends boolean> = {
    multiple?: M
    value?: M extends true ? T[] : T | null
    defaultValue?: M extends true ? T[] : T | null
    onValueChange?: M extends true
        ? Dispatch<SetStateAction<T[]>>
        : Dispatch<SetStateAction<T | null>>
    children: ReactNode
}

type SelectionProviderProps<T> = {
    multiple: boolean
    value?: T | T[] | null
    defaultValue?: T | T[] | null
    onValueChange?: Dispatch<SetStateAction<T | T[] | null>>
}

type UseSelectionParams<T> = {
    multiple?: boolean
    value?: T | T[] | null
    defaultValue?: T | T[] | null
    onValueChange?: Dispatch<SetStateAction<T | T[] | null>>
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

type SelectionItemRenderProps = {
    isSelected: boolean
}

type SelectionItemProps<T> = {
    value: T
    children: (props: SelectionItemRenderProps) => ReactNode
}

type SelectionTriggerRenderProps = {
    onClick: () => void
    // isSelected: boolean
}

type SelectionTriggerProps = {
    children: (props: SelectionTriggerRenderProps) => ReactNode
}

type SelectionContentRenderProps = {
    ref: RefObject<HTMLDivElement | null>
    // isSelected: boolean
}

type SelectionContentProps = {
    children: (props: SelectionContentRenderProps) => ReactNode
}

export type {
    SelectionContentProps,
    SelectionContextValue,
    SelectionItemContextValue,
    SelectionItemProps,
    SelectionItemProviderProps,
    SelectionItemRenderProps,
    SelectionProviderProps,
    SelectionRootProps,
    SelectionTriggerProps,
    UseSelectionParams,
}
