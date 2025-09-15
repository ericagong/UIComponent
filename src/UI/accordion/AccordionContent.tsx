import { HTMLAttributes } from 'react'
import { useRef } from 'react'

import useItemIdentifier from '@/features/common/useItemIdentifier'
import useFoundReveal from '@/features/selection/triggers/useFoundReveal'
import useSelectionActions from '@/features/selection/useSelectionActions'

import cx from './cx'

type AccordionContentProps = HTMLAttributes<HTMLDivElement> & {
    className?: string
}

const AccordionContent = ({ children, className, ...props }: AccordionContentProps) => {
    const { isSelected, select } = useSelectionActions()
    const { id } = useItemIdentifier()

    const contentRef = useRef<HTMLDivElement | null>(null)
    const isOpen = isSelected(id)
    const open = () => select(id)
    useFoundReveal(contentRef, isOpen, open)

    return (
        <div
            {...props}
            ref={contentRef}
            className={cx('content', className)}
            id={`content-${String(id)}`}
            role="region"
            aria-labelledby={`trigger-${String(id)}`}
            hidden={!isOpen}
            data-state={isOpen ? 'open' : 'closed'}
        >
            {children}
        </div>
    )
}

export default AccordionContent
