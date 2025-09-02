import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useState } from 'react'

type UseControllableStateParams<T> = {
    value?: T
    defaultValue?: T
    onValueChange?: (next: T) => void
}

type UseControllableStateReturn<T> = [T, Dispatch<SetStateAction<T>>]

const useControllableState = <T>({
    value,
    defaultValue,
    onValueChange,
}: UseControllableStateParams<T>): UseControllableStateReturn<T> => {
    const [uncontrolledState, setUncontrolledState] = useState<T | undefined>(defaultValue)

    const isControlled = value !== undefined
    // TODO 이 부분 에러 잡기
    // console.log(
    //     'uncontrolledState',
    //     uncontrolledState,
    //     defaultValue,
    //     isControlled,
    //     value,
    //     value === null
    // )

    const currentState = isControlled ? (value as T) : (uncontrolledState as T)

    const setCurrentState = useCallback<Dispatch<SetStateAction<T>>>(
        next => {
            const nextValue = next instanceof Function ? next(currentState) : next

            if (!isControlled) {
                setUncontrolledState(nextValue)
            }
            onValueChange?.(nextValue)
        },
        [isControlled, onValueChange, currentState]
    )

    return [currentState, setCurrentState]
}

export default useControllableState

export type { UseControllableStateParams }
