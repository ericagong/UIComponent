import { ReactNode, useRef } from 'react'

import useSearchReveal from '@/components/hooks/useSearchReveal'

import { useTabsContext } from './context/TabsContext'
import cx from './cx'

const TabsContent = ({ index, children }: { index: number; children: ReactNode }) => {
    const { openIndex, openTab } = useTabsContext()
    const isOpen = openIndex === index
    const contentRef = useRef<HTMLDivElement | null>(null)
    useSearchReveal(contentRef, isOpen, () => {
        openTab(index)
    })

    return (
        <div
            className={cx('tabs-content', { 'is-open': isOpen })}
            id={`panel-${index}`}
            ref={contentRef}
            role="tabpanel"
            aria-hidden={!isOpen}
        >
            {children}
        </div>
    )
}

export default TabsContent
