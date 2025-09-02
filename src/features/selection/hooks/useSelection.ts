import useControllableState from '@/hooks_v2/level1/useControllableState'

import type { UseSelectionParams } from '../types'

const normalizeToSet = <T>(value: T | T[] | null | undefined): Set<T> | undefined => {
    if (value === undefined) return undefined
    if (value === null) return new Set()
    return new Set(Array.isArray(value) ? value : [value])
}

const serializeFromSet = <T>(set: Set<T>, multiple: boolean): T | T[] | null => {
    const values = [...set]
    if (multiple) return values
    if (values.length === 0) return null
    return values[0]
}

// level2
const useSelection = <T>({
    multiple = false,
    value,
    defaultValue,
    onValueChange,
}: UseSelectionParams<T>) => {
    const [state, setState] = useControllableState<Set<T>>({
        value: normalizeToSet(value),
        defaultValue: normalizeToSet(defaultValue),
        onValueChange: nextSet => {
            onValueChange?.(serializeFromSet(nextSet, multiple))
        },
    })

    const has = (target: T) => state.has(target)

    const add = (target: T) => {
        setState(prev => {
            const nextState = new Set(prev)
            if (multiple) {
                nextState.add(target)
                return nextState
            }
            return new Set([target])
        })
    }

    const remove = (target: T) => {
        setState(prev => {
            const nextState = new Set(prev)
            nextState.delete(target)
            return nextState
        })
    }

    return {
        value: serializeFromSet(state, multiple),
        has,
        add,
        remove,
    }
}

export default useSelection
