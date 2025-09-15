import { HTMLAttributes } from 'react'

import useItemIdentifier from '@/features/common/useItemIdentifier'
import useSelectionActions from '@/features/selection/useSelectionActions'

type AccordionContentProps = HTMLAttributes<HTMLDivElement>

const AccordionContent = ({ children, ...props }: AccordionContentProps) => {
    const { isSelected } = useSelectionActions()
    const { id } = useItemIdentifier()

    const isOpen = isSelected(id)

    return (
        <div
            {...props}
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
