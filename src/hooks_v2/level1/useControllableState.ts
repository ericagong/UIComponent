import { useCallback, useState } from 'react'

type UseControllableStateParams<T> = {
    value?: T
    defaultValue?: T
    onValueChange?: (newValue: T) => void
}

type UseControllableStateReturn<T> = [T, (newValue: T) => void]

const useControllableState = <T>({
    value,
    defaultValue,
    onValueChange,
}: UseControllableStateParams<T>): UseControllableStateReturn<T> => {
    const [uncontrolledState, setUncontrolledState] = useState<T | undefined>(defaultValue)

    const isControlled = value !== undefined

    const currentState = isControlled ? (value as T) : (uncontrolledState as T)

    const setCurrentState = useCallback(
        (newValue: T) => {
            if (!isControlled) {
                setUncontrolledState(newValue)
            }
            onValueChange?.(newValue)
        },
        [isControlled, onValueChange]
    )

    return [currentState, setCurrentState]
}

export default useControllableState
