import { useCallback, useMemo } from 'react'
import { Dispatch, SetStateAction } from 'react'

import type { SelectionProviderProps, SelectionRootProps } from '../types'

// TODO : SRP에 따른 역할 분리
// useSelectionSetState: Set 기반 상태 관리
// useSelectionAction: add/remove/has 동작 정의
// useSelectionAdaptor: RootProps → ProviderProps 변환기

const useSelectionAdaptor = <T, M extends boolean>(
    props: SelectionRootProps<T, M>
): SelectionProviderProps<T> => {
    const { multiple = false, value, defaultValue, onValueChange } = props

    const adaptedOnValueChange = useCallback<Dispatch<SetStateAction<T | T[] | null>>>(
        next => {
            if (!onValueChange) return
            ;(onValueChange as Dispatch<SetStateAction<T | T[] | null>>)(next)
        },
        [onValueChange]
    )

    const contextValue = useMemo(
        () => ({
            multiple,
            value,
            defaultValue,
            onValueChange: adaptedOnValueChange,
        }),
        [multiple, value, defaultValue, adaptedOnValueChange]
    )

    return contextValue
}

export default useSelectionAdaptor
