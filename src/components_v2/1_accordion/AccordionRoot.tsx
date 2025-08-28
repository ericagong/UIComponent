import useControllableState from '@/hooks_v2/level1/useControllableState'

import AccordionProvider from './context/AccordionProvider'
import cx from './cx'
import { AccordionRootProps } from './types'

const AccordionRoot = ({
    value,
    defaultValue = null,
    onValueChange,
    children,
}: AccordionRootProps) => {
    const [openId, setOpenId] = useControllableState({
        value,
        defaultValue,
        onValueChange,
    })

    return (
        <AccordionProvider openId={openId} setOpenId={setOpenId}>
            <ul className={cx('root')}>{children}</ul>
        </AccordionProvider>
    )
}

export default AccordionRoot
