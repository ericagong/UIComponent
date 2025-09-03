import { ReactNode } from 'react'

import useSelection from '../hooks/useSelection'
import type { MultiOptions, Options, SingleOptions } from '../types'
import SelectionActionsContext from './ActionsContext'

type SingleActionsProviderProps<T> = SingleOptions<T> & {
    children: ReactNode
}
type MultiActionsProviderProps<T> = MultiOptions<T> & {
    children: ReactNode
}
type ActionsProviderProps<T> = Options<T> & {
    children: ReactNode
}

const SingleActionsProvider = <T,>(props: SingleActionsProviderProps<T>) => {
    const actions = useSelection<T>(props)

    return (
        <SelectionActionsContext.Provider value={actions}>
            {props.children}
        </SelectionActionsContext.Provider>
    )
}

const MultiActionsProvider = <T,>(props: MultiActionsProviderProps<T>) => {
    const actions = useSelection<T>(props)

    return (
        <SelectionActionsContext.Provider value={actions}>
            {props.children}
        </SelectionActionsContext.Provider>
    )
}

const ActionsProvider = <T,>(props: ActionsProviderProps<T>) => {
    if (props.multiple) {
        return <MultiActionsProvider {...props} />
    }
    return <SingleActionsProvider {...props} />
}

export default ActionsProvider
