import { ButtonHTMLAttributes } from 'react'

import useItemIdentifier from '@/features/common/useItemIdentifier'
import useSelectionActions from '@/features/selection/useSelectionActions'

type AccordionTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>

const AccordionTrigger = ({ children, ...props }: AccordionTriggerProps) => {
    const { isSelected, select, unselect } = useSelectionActions()
    const { id } = useItemIdentifier()

    const isOpen = isSelected(id)

    const toggle = () => {
        return isOpen ? unselect(id) : select(id)
    }

    return (
        <button
            {...props}
            type="button"
            id={`trigger-${String(id)}`}
            aria-expanded={isOpen}
            aria-controls={`content-${String(id)}`}
            data-state={isOpen ? 'open' : 'closed'}
            onClick={toggle}
        >
            {children}
        </button>
    )
}

export default AccordionTrigger
