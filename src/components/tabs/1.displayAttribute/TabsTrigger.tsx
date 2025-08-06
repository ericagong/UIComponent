import { ReactNode } from 'react'

import cx from '../cx'
import useKeyboardTabMove from '../hooks/useKeyboardTabMove'
import useTabsContext from '../hooks/useTabsContext'

const TabsTrigger = ({ index, children }: { index: number; children: ReactNode }) => {
    const { openIndex, setOpenIndex, tabRefs } = useTabsContext()
    const isOpen = openIndex === index
    const { moveToNextTab } = useKeyboardTabMove(index, setOpenIndex, tabRefs)

    return (
        <button
            type="button"
            ref={el => {
                tabRefs.current[index] = el
            }}
            className={cx('tabs-trigger', { 'is-open': isOpen })}
            onClick={() => setOpenIndex(index)}
            onKeyDown={moveToNextTab}
            role="tab"
            aria-selected={isOpen}
            tabIndex={isOpen ? 0 : -1}
        >
            {children}
        </button>
    )
}

export default TabsTrigger
