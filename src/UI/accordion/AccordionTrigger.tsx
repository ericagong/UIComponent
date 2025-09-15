import { ButtonHTMLAttributes } from 'react'

import useItemIdentifier from '@/features/common/useItemIdentifier'
import useSelectionActions from '@/features/selection/useSelectionActions'

import cx from './cx'

type AccordionTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
}

const AccordionTrigger = ({ children, className, ...props }: AccordionTriggerProps) => {
    const { isSelected, select, unselect } = useSelectionActions()
    const { id } = useItemIdentifier()

    const isOpen = isSelected(id)

    const toggle = () => {
        return isOpen ? unselect(id) : select(id)
    }

    return (
        <button
            {...props}
            className={cx('trigger', className)}
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
