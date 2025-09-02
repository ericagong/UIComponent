import { JSX } from 'react'

import SelectionProvider from '../context/SelectionProvider'
import useSelectionAdaptor from '../hooks/useSelectionAdaptor'
import { SelectionRootProps } from '../types'

const SelectionRoot = <T, M extends boolean>(props: SelectionRootProps<T, M>): JSX.Element => {
    const providerProps = useSelectionAdaptor(props)

    return <SelectionProvider {...providerProps}>{props.children}</SelectionProvider>
}

export default SelectionRoot
