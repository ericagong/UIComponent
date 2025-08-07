import { ReactNode, useMemo, useRef, useState } from 'react'

import TabsContext from './context/TabsContext'
import cx from './cx'

const TabsRoot = ({
    defaultOpenIndex = 0,
    children,
}: {
    defaultOpenIndex?: number
    children: ReactNode
}) => {
    const [openIndex, openTab] = useState(defaultOpenIndex)
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

    const contextValue = useMemo(
        () => ({
            openIndex,
            openTab,
            tabRefs,
        }),
        [openIndex, openTab]
    )

    return (
        <TabsContext.Provider value={contextValue}>
            <div className={cx('tabs-root')}>{children}</div>
        </TabsContext.Provider>
    )
}

export default TabsRoot
