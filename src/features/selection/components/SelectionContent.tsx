import type { ReactNode, RefObject } from 'react'
import { useRef } from 'react'

import useFoundReveal from '@/features/common/combined/useFoundReveal'
import { isFocusable } from '@/utils/events'

import { useActionsContext } from '../context/ActionsContext'
import { useIdentifierContext } from '../context/IdentifierContext'

type SelectionContentRenderProps = {
    ref: RefObject<HTMLDivElement | null>
    // isSelected: boolean
}

type SelectionContentProps = {
    children: (props: SelectionContentRenderProps) => ReactNode
}

const SelectionContent = ({ children }: SelectionContentProps) => {
    const { isSelected, select } = useActionsContext()
    const { value } = useIdentifierContext()

    const contentRef = useRef<HTMLDivElement | null>(null)

    const handleFound = () => {
        if (isSelected(value)) return

        select(value)

        const target = contentRef.current
        if (isFocusable(target)) {
            target.focus()
        }
    }

    useFoundReveal(contentRef, isSelected(value), handleFound)

    return <>{children({ ref: contentRef })}</>
}

export default SelectionContent
export type { SelectionContentProps, SelectionContentRenderProps }
