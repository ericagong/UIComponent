import { useRef } from 'react'

import useHiddenFound from '@/hooks_v2/level2/useHiddenFound'

import { useAccordionItemStateContext } from './context/AccordionItemProvider'
import { useAccordionActionsContext, useAccordionStateContext } from './context/AccordionProvider'
import cx from './cx'
import { AccordionContentProps } from './types'

const AccordionContent = ({ children }: AccordionContentProps) => {
    const { openId } = useAccordionStateContext()
    const { id, triggerId, contentId } = useAccordionItemStateContext()

    const contentRef = useRef<HTMLDivElement>(null)
    const { open } = useAccordionActionsContext()
    const isOpen = openId === id

    const handleFound = () => {
        if (!id) return
        open(id)
    }

    useHiddenFound(contentRef, isOpen, handleFound)

    return (
        <div
            className={cx('content')}
            ref={contentRef}
            id={contentId}
            aria-labelledby={triggerId}
            aria-hidden={!isOpen}
        >
            {children}
        </div>
    )
}

export default AccordionContent
