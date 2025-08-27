import AccordionProvider from './context/AccordionProvider'
import cx from './cx'
import { AccordionRootProps } from './types'

const AccordionRoot = ({ children }: AccordionRootProps) => {
    return (
        <AccordionProvider>
            <ul className={cx('root')}>{children}</ul>
        </AccordionProvider>
    )
}

export default AccordionRoot
