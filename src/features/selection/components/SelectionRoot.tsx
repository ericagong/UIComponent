import { JSX } from 'react'

import SelectionProvider from '../context/SelectionProvider'
import useSelectionAdaptor from '../hooks/useSelectionAdaptor'
import { SelectionRootProps } from '../types'

function SelectionRoot<T>(props: SelectionRootProps<T>): JSX.Element {
    const providerProps = useSelectionAdaptor(props)

    return <SelectionProvider {...providerProps}>{props.children}</SelectionProvider>
}

export default SelectionRoot
