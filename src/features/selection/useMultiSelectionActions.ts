import { useCallback, useMemo } from 'react'

type UseMultiSelectionParams<T> = {
    state: T[]
    setState: (next: T[] | ((prev: T[]) => T[])) => void
}

type UseMultiSelectionReturn<T> = {
    isSelected: (v: T) => boolean
    select: (v: T) => void
    unselect: (v: T) => void
}

const useMultiSelectionActions = <T>({
    state,
    setState,
}: UseMultiSelectionParams<T>): UseMultiSelectionReturn<T> => {
    const isSelected = useCallback((v: T) => state.includes(v), [state])

    const select = useCallback(
        (v: T) => {
            setState(prev => (prev.includes(v) ? prev : [...prev, v]))
        },
        [setState]
    )

    const unselect = useCallback(
        (v: T) => {
            setState(prev => prev.filter(item => item !== v))
        },
        [setState]
    )

    const actions = useMemo(
        () => ({ isSelected, select, unselect }),
        [isSelected, select, unselect]
    )

    return actions
}

export default useMultiSelectionActions
