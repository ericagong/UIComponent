import { createContext, useContext, useId } from 'react'

type UseItemIdentifierProps<T> = {
    value?: T
}

type UseItemIdentifierReturns<T> = {
    id: T
}

type ItemIdentifierContextValue<T> = {
    id: T
}

const useItemIdentifierRegister = <T>({
    value,
}: UseItemIdentifierProps<T>): UseItemIdentifierReturns<T> => {
    const uid = useId() as T
    const id = value ?? uid

    return { id }
}

const ItemIdentifierContext = createContext<ItemIdentifierContextValue<any> | null>(null)

const useItemIdentifier = <T>() => {
    const context = useContext(ItemIdentifierContext)
    if (!context) throw new Error('useItemIdentifier must be used within ItemIdentifierProvider')
    return context as ItemIdentifierContextValue<T>
}

export { ItemIdentifierContext, useItemIdentifierRegister }
export default useItemIdentifier
