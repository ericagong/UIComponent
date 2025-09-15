import { ReactNode, useMemo } from 'react'

import useControllableState from '@/features/common/useControllableState'
import { SelectionContext } from '@/features/selection/useSelectionActions'
import useSingleSelectionActions from '@/features/selection/useSingleSelectionActions'

import cx from './cx'

type AccordionSingleRootProps<T> = {
    value?: T | null
    defaultValue?: T | null
    onValueChange?: (next: T | null) => void
    children: ReactNode
} & {
    className?: string
}

const AccordionSingleRoot = <T,>({
    value,
    defaultValue,
    onValueChange,
    children,
    className,
}: AccordionSingleRootProps<T>) => {
    const [state, setState] = useControllableState<T | null>({ value, defaultValue, onValueChange })

    const actions = useSingleSelectionActions({ state, setState })

    const context = useMemo(() => actions, [actions])

    return (
        <SelectionContext.Provider value={context}>
            <ul className={cx('root', className)}>{children}</ul>
        </SelectionContext.Provider>
    )
}

export default AccordionSingleRoot
export type { AccordionSingleRootProps }
