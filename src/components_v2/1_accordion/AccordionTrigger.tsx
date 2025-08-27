import { useAccordionItemStateContext } from './context/AccordionItemProvider'
import { useAccordionActionsContext, useAccordionStateContext } from './context/AccordionProvider'
import cx from './cx'
import { AccordionTriggerProps } from './types'

const AccordionTrigger = ({ children }: AccordionTriggerProps) => {
    const { openedItemId } = useAccordionStateContext()
    const { id, triggerId, contentId } = useAccordionItemStateContext()

    const isOpened = openedItemId === id

    const { toggle } = useAccordionActionsContext()

    const handleClick = () => {
        if (!id) return
        toggle(isOpened ? null : id)
    }

    return (
        <button
            className={cx('trigger')}
            id={triggerId}
            aria-controls={contentId}
            aria-expanded={isOpened}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default AccordionTrigger
