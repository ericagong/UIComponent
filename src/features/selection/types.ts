import type { Dispatch, ReactNode, SetStateAction } from 'react'

type SingleOptions<T> = {
    multiple: false
    defaultValue?: T | null
    value?: T | null
    onValueChange?: Dispatch<SetStateAction<T | null>>
    children: ReactNode
}

type MultiOptions<T> = {
    multiple: true
    defaultValue?: T[]
    value?: T[]
    onValueChange?: Dispatch<SetStateAction<T[]>>
    children: ReactNode
}

type Options<T> = SingleOptions<T> | MultiOptions<T>

type SingleStrategy<T> = {
    getInternalValue: (externalState: T | null | undefined) => Set<T> | undefined
    getExternalValue: (state: Set<T>) => T | null
    has: (state: Set<T>, value: T) => boolean
    add: (state: Set<T>, value: T) => Set<T>
    remove: (state: Set<T>, value: T) => Set<T>
}

type MultiStrategy<T> = {
    getInternalValue: (externalState: T[] | undefined) => Set<T> | undefined
    getExternalValue: (state: Set<T>) => T[]
    has: (state: Set<T>, value: T) => boolean
    add: (state: Set<T>, value: T) => Set<T>
    remove: (state: Set<T>, value: T) => Set<T>
}

type Strategy<T> = SingleStrategy<T> | MultiStrategy<T>

type Actions<T> = {
    isSelected: (value: T) => boolean
    select: (value: T) => void
    unselect: (value: T) => void
}

type Identifier<T> = {
    value: T
}

export type {
    Actions,
    Identifier,
    MultiOptions,
    MultiStrategy,
    Options,
    SingleOptions,
    SingleStrategy,
    Strategy,
}
