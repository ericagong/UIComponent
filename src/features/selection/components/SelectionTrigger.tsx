import type { ReactNode } from 'react'

import { useActionsContext } from '../context/ActionsContext'
import { useIdentifierContext } from '../context/IdentifierContext'

type SelectionTriggerRenderProps = {
    onClick: () => void
    // isSelected: boolean
}

type SelectionTriggerProps = {
    children: (props: SelectionTriggerRenderProps) => ReactNode
}

const SelectionTrigger = ({ children }: SelectionTriggerProps) => {
    const { isSelected, select, unselect } = useActionsContext()
    const { value } = useIdentifierContext()

    const handleClick = () => {
        if (isSelected(value)) unselect(value)
        else {
            select(value)
        }
    }

    return <>{children({ onClick: handleClick })}</>
}

export default SelectionTrigger
export type { SelectionTriggerProps, SelectionTriggerRenderProps }
