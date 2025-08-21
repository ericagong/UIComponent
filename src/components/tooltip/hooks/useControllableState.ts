import { useCallback, useState } from 'react'

type UseControllableState<T> = {
    value?: T
    defaultValue?: T
    onChange?: (value: T) => void
}

const useControllableState = <T>({ value, defaultValue, onChange }: UseControllableState<T>) => {
    const [uncontrolledState, setUncontrolledState] = useState<T | undefined>(defaultValue)

    const isControlled = value !== undefined
    const currentState = isControlled ? value : uncontrolledState

    const setState = useCallback(
        (newValue: T) => {
            if (!isControlled) {
                setUncontrolledState(newValue)
            }
            onChange?.(newValue)
        },
        [isControlled, onChange]
    )

    return [currentState, setState] as const
}

export default useControllableState
