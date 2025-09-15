import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useState } from 'react'

type UseControllableStateParams<T> = {
    value?: T
    onValueChange?: (next: T) => void
    defaultValue?: T
}

type UseControllableStateReturn<T> = [T, Dispatch<SetStateAction<T>>]

const useControllableState = <T>({
    value: controlledState,
    onValueChange: onControlledChange,
    defaultValue,
}: UseControllableStateParams<T>): UseControllableStateReturn<T> => {
    const isControlled = controlledState !== undefined

    const [uncontrolledState, setUncontrolledState] = useState<T>(defaultValue as T)

    const currentState: T = isControlled ? controlledState : uncontrolledState

    const setCurrentState = useCallback<Dispatch<SetStateAction<T>>>(
        next => {
            const nextState =
                typeof next === 'function' ? (next as (prev: T) => T)(currentState) : next

            if (!isControlled) {
                setUncontrolledState(nextState)
            } else {
                onControlledChange?.(nextState)
            }
        },
        [isControlled, currentState, onControlledChange]
    )

    return [currentState, setCurrentState]
}

export default useControllableState
