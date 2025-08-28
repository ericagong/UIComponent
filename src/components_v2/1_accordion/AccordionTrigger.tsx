import { useAccordionItemStateContext } from './context/AccordionItemProvider'
import { useAccordionActionsContext, useAccordionStateContext } from './context/AccordionProvider'
import cx from './cx'
import { AccordionTriggerProps } from './types'

const AccordionTrigger = ({ children }: AccordionTriggerProps) => {
    const { openId } = useAccordionStateContext()
    const { id, triggerId, contentId } = useAccordionItemStateContext()

    const isOpen = openId === id

    const { open, close } = useAccordionActionsContext()

    const handleClick = () => {
        if (!id) return
        if (!isOpen) open(id)
        else close()
    }

    return (
        <button
            className={cx('trigger')}
            id={triggerId}
            aria-controls={contentId}
            aria-expanded={isOpen}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default AccordionTrigger
