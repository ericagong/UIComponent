import useSelection from '../hooks/useSelection'
import type { SelectionContextValue, SelectionProviderProps } from '../types'
import SelectionContext from './SelectionContext'

const SelectionProvider = <T,>({
    value,
    defaultValue,
    onValueChange,
    multiple = false,
    children,
}: SelectionProviderProps<T>) => {
    const {
        value: selectedValue,
        has,
        add,
        remove,
    } = useSelection<T>({
        value,
        defaultValue,
        onValueChange,
        multiple,
    })

    const contextValue: SelectionContextValue<T> = {
        value: selectedValue,
        has,
        add,
        remove,
        // multiple,
    }

    return <SelectionContext.Provider value={contextValue}>{children}</SelectionContext.Provider>
}

export default SelectionProvider
