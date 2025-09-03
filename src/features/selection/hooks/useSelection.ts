import { useMemo } from 'react'

import useControllableState from '@/hooks_v2/level1/useControllableState'

import createSelectionStrategy from '../createSelectionStrategy'
import type { Actions, MultiOptions, Options, SingleOptions } from '../types'

type SingleUseSelectionParams<T> = SingleOptions<T>
type MultiUseSelectionParams<T> = MultiOptions<T>
type UseSelectionParams<T> = Options<T>

type UseSelectionReturn<T> = Actions<T>

function useSelection<T>(params: SingleUseSelectionParams<T>): UseSelectionReturn<T>
function useSelection<T>(params: MultiUseSelectionParams<T>): UseSelectionReturn<T>

function useSelection<T>({
    multiple,
    value,
    defaultValue,
    onValueChange,
}: UseSelectionParams<T>): UseSelectionReturn<T> {
    const strategy = useMemo(
        () => (multiple ? createSelectionStrategy<T>(true) : createSelectionStrategy<T>(false)),
        [multiple]
    )

    const bridgeOnValueChange = (nextSelected: Set<T>) => {
        const externalState = strategy.getExternalValue(nextSelected)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onValueChange?.(externalState as any)
    }

    const [selected, setSelected] = useControllableState<Set<T>>({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        defaultValue: strategy.getInternalValue(defaultValue as any),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        value: strategy.getInternalValue(value as any),
        onValueChange: bridgeOnValueChange,
    })

    const isSelected = (target: T) => selected.has(target)
    const select = (target: T) => setSelected(prev => strategy.add(prev, target))
    const unselect = (target: T) => setSelected(prev => strategy.remove(prev, target))

    return {
        isSelected,
        select,
        unselect,
    }
}

export default useSelection
