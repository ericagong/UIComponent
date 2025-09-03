import type { MultiStrategy, SingleStrategy, Strategy } from './types'

// TODO transform(normalize + serialize)
// TODO actions(getValue, has, add, remove)로 분리할지 고민
const createMultiSelectionStrategy = <T>(): MultiStrategy<T> => {
    return {
        getInternalValue: externalState => {
            if (externalState === undefined) return undefined
            return new Set(externalState)
        },
        getExternalValue: state => [...state],
        has: (state, value) => state.has(value),
        add: (state, value) => {
            const nextState = new Set(state)
            nextState.add(value)
            return nextState
        },
        remove: (state, value) => {
            const nextState = new Set(state)
            nextState.delete(value)
            return nextState
        },
    }
}

const createSingleSelectionStrategy = <T>(): SingleStrategy<T> => {
    return {
        getInternalValue: externalState => {
            if (externalState === undefined) return undefined
            if (externalState === null) return new Set()
            return new Set([externalState])
        },
        getExternalValue: state => (state.size === 0 ? null : [...state][0]),
        has: (state, value) => state.has(value),
        add: (state, value) => {
            const nextState = new Set(state)
            nextState.clear()
            nextState.add(value)
            return nextState
        },
        remove: (state, value) => {
            const nextState = new Set(state)
            nextState.delete(value)
            return nextState
        },
    }
}

function createSelectionStrategy<T>(multiple: false): SingleStrategy<T>
function createSelectionStrategy<T>(multiple: true): MultiStrategy<T>
function createSelectionStrategy<T>(multiple: boolean): Strategy<T> {
    return multiple ? createMultiSelectionStrategy<T>() : createSingleSelectionStrategy<T>()
}

export default createSelectionStrategy
