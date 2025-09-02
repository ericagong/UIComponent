import { useCallback, useMemo } from 'react'

import type { SelectionProviderProps, SelectionRootProps } from '../types'

const useSelectionAdaptor = <T>(props: SelectionRootProps<T>): SelectionProviderProps<T> => {
    const { multiple = false, value, defaultValue, onValueChange, children } = props

    const normalizedValue = value ?? null
    const normalizedDefaultValue = defaultValue ?? null

    const normalizedHandler = useCallback(
        (next: T | T[] | null) => {
            if (!onValueChange) return
            if (multiple) {
                ;(onValueChange as (v: T[] | null) => void)(next as T[] | null)
            } else {
                ;(onValueChange as (v: T | null) => void)(next as T | null)
            }
        },
        [multiple, onValueChange]
    )

    const contextValue = useMemo(
        () => ({
            multiple,
            value: normalizedValue,
            defaultValue: normalizedDefaultValue,
            onValueChange: normalizedHandler,
            children,
        }),
        [multiple, normalizedValue, normalizedDefaultValue, normalizedHandler, children]
    )

    return contextValue
}

export default useSelectionAdaptor
