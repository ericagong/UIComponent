import { ReactNode, useRef, useState } from 'react'

import TabsContext from '../context/TabsContext'
import cx from '../cx'

const TabsRoot = ({
    defaultOpenIndex = 0,
    children,
}: {
    defaultOpenIndex?: number
    children: ReactNode
}) => {
    const [openIndex, setOpenIndex] = useState(defaultOpenIndex)
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

    return (
        <TabsContext.Provider value={{ openIndex, setOpenIndex, tabRefs }}>
            <div className={cx('tabs-root')}>{children}</div>
        </TabsContext.Provider>
    )
}

export default TabsRoot
