import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useState } from 'react'

type UseControllableStateParams<T> = {
    value?: T | null
    onValueChange?: (next: T | null) => void
    defaultValue?: T | null
}

type UseControllableStateReturn<T> = [T | null, Dispatch<SetStateAction<T | null>>]

const useControllableState = <T>({
    value: controlled,
    onValueChange: onControlledChange,
    defaultValue = null,
}: UseControllableStateParams<T>): UseControllableStateReturn<T> => {
    const isControlled = controlled !== undefined

    const [uncontrolled, setUncontrolled] = useState<T | null>(defaultValue)

    const current: T | null = isControlled ? controlled : uncontrolled

    const setCurrent = useCallback<Dispatch<SetStateAction<T | null>>>(
        next => {
            const nextState = next instanceof Function ? next(current) : next

            if (isControlled) {
                onControlledChange?.(nextState)
            } else {
                setUncontrolled(nextState)
            }
        },
        [isControlled, current, onControlledChange]
    )

    return [current, setCurrent]
}

export default useControllableState
