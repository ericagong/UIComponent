import { ReactNode } from 'react'

import { useTabsContext } from './context/TabsContext'
import cx from './cx'
import useArrowKeyNavigation from './hooks/useArrowKeyNavigation'

const TabsTrigger = ({ index, children }: { index: number; children: ReactNode }) => {
    const { openIndex, openTab, tabRefs } = useTabsContext()
    const isOpen = openIndex === index
    const { navigate } = useArrowKeyNavigation(index, openTab, tabRefs)

    return (
        <button
            type="button"
            ref={el => {
                tabRefs.current[index] = el
            }}
            className={cx('tabs-trigger', { 'is-open': isOpen })}
            onClick={() => openTab(index)}
            onKeyDown={navigate}
            role="tab"
            aria-selected={isOpen}
            tabIndex={isOpen ? 0 : -1}
        >
            {children}
        </button>
    )
}

export default TabsTrigger
