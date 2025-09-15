import { useCallback, useMemo } from 'react'

type UseSingleSelectionParams<T> = {
    state: T | null
    setState: (next: T | null | ((prev: T | null) => T | null)) => void
}

type UseSingleSelectionReturn<T> = {
    isSelected: (v: T) => boolean
    select: (v: T) => void
    unselect: () => void
}

const useSingleSelectionActions = <T>({
    state,
    setState,
}: UseSingleSelectionParams<T>): UseSingleSelectionReturn<T> => {
    const isSelected = useCallback((v: T) => state === v, [state])

    const select = useCallback(
        (v: T) => {
            setState(v)
        },
        [setState]
    )

    const unselect = useCallback(() => {
        setState(null)
    }, [setState])

    const actions = useMemo(
        () => ({ isSelected, select, unselect }),
        [isSelected, select, unselect]
    )

    return actions
}

export default useSingleSelectionActions
export type { UseSingleSelectionReturn }
