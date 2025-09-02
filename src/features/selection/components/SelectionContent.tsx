import { useRef } from 'react'

import useHiddenFound from '@/hooks_v2/level2/useHiddenFound'
import { isFocusable } from '@/utils/events'

import { useSelectionContext } from '../context/SelectionContext'
import { useSelectionItemContext } from '../context/SelectionItemContext'
import { SelectionContentProps } from '../types'

const SelectionContent = ({ children }: SelectionContentProps) => {
    const { has, add } = useSelectionContext()
    const { value } = useSelectionItemContext()

    const contentRef = useRef<HTMLDivElement | null>(null)
    const isSelected = has(value)

    const handleFound = () => {
        if (isSelected) return

        add(value)

        const target = contentRef.current
        if (isFocusable(target)) {
            target.focus()
        }
    }

    useHiddenFound(contentRef, isSelected, handleFound)

    return <>{children({ ref: contentRef })}</>
}

export default SelectionContent
