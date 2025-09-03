import type { ReactNode } from 'react'
import { JSX } from 'react'

import ActionsProvider from '../context/ActionsProvider'
import type { Options } from '../types'

type SelectionRootProps<T> = Options<T> & {
    children: ReactNode
}

const SelectionRoot = <T,>(props: SelectionRootProps<T>): JSX.Element => {
    return <ActionsProvider {...props} />
}

export default SelectionRoot
export type { SelectionRootProps }
