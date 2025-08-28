import AccordionItemProvider from './context/AccordionItemProvider'
import { useAccordionStateContext } from './context/AccordionProvider'
import cx from './cx'
import { AccordionItemProps } from './types'

const AccordionItem = ({ id, children }: AccordionItemProps) => {
    const { openId } = useAccordionStateContext()

    const isOpen = openId === id

    return (
        <AccordionItemProvider id={id}>
            <li className={cx('item', { 'is-open': isOpen })}>{children}</li>
        </AccordionItemProvider>
    )
}

export default AccordionItem
