import { ReactNode, useMemo } from 'react'

import useControllableState from '@/features/common/useControllableState'
import useMultiSelectionActions from '@/features/selection/useMultiSelectionActions'
import { SelectionContext } from '@/features/selection/useSelectionActions'

import cx from './cx'
type AccordionMultiRootProps<T> = {
    value?: T[]
    defaultValue?: T[]
    onValueChange?: (next: T[]) => void
    children: ReactNode
} & {
    className?: string
}

const AccordionMultiRoot = <T,>({
    value,
    defaultValue,
    onValueChange,
    children,
    className,
}: AccordionMultiRootProps<T>) => {
    const [state, setState] = useControllableState<T[]>({
        value,
        defaultValue,
        onValueChange,
    })

    const actions = useMultiSelectionActions({ state, setState })

    const context = useMemo(() => actions, [actions])

    return (
        <SelectionContext.Provider value={context}>
            <ul className={cx('root', className)}>{children}</ul>
        </SelectionContext.Provider>
    )
}

export default AccordionMultiRoot
export type { AccordionMultiRootProps }
