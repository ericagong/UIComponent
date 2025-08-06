import { ReactNode } from 'react'

import cx from '../cx'
import useTabsContext from '../hooks/useTabsContext'

const TabsContent = ({ index, children }: { index: number; children: ReactNode }) => {
    const { openIndex } = useTabsContext()
    const isOpen = openIndex === index

    return (
        <div
            className={cx('tabs-content', { 'is-open': isOpen })}
            id={`panel-${index}`}
            role="tabpanel"
            aria-hidden={!isOpen}
        >
            {children}
        </div>
    )
}

export default TabsContent
