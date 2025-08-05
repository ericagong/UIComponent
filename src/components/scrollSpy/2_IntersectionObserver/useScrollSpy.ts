import { useCallback, useEffect, useRef, useState } from 'react'

import useIntersectionObserver from '@/components/hook/useIntersectionObserver'

type Elem = Element | null

const STICKY_HEADER_HEIGHT = 50 // px = .navigation-bar height
const DEFAULT_CURRENT_ITEM_INDEX = 0
const IOOptions = {
    rootMargin: `-${STICKY_HEADER_HEIGHT}px 0% 0% 0%`,
    threshold: 0.5,
}

const useScrollSpy = () => {
    const navigationBarRef = useRef<HTMLUListElement>(null)
    const navigationItemsRef = useRef<(HTMLLIElement | null)[]>([])
    const contentItemsRef = useRef<Elem[]>([])
    const { visibleEntries } = useIntersectionObserver(contentItemsRef, IOOptions)
    const [currentIndex, setCurrentIndex] = useState<number | null>(DEFAULT_CURRENT_ITEM_INDEX)

    const handleNavigationItemClick = useCallback((index: number) => {
        const $item = contentItemsRef.current[index]
        if (!$item) return

        const currentScrollTop = document.scrollingElement?.scrollTop ?? 0
        const adjustedScrollTop = currentScrollTop - STICKY_HEADER_HEIGHT
        const itemTop = $item.getBoundingClientRect().top
        const targetTop = adjustedScrollTop + itemTop

        window.scrollTo({
            top: targetTop,
            behavior: 'smooth',
        })
    }, [])

    useEffect(() => {
        if (!visibleEntries || visibleEntries.length === 0) return

        const topMostEntry = visibleEntries.reduce((topEntry, entry) => {
            return entry.boundingClientRect.top < topEntry.boundingClientRect.top ? entry : topEntry
        })
        const $item = topMostEntry.target as HTMLElement
        const itemIndex = $item?.dataset.index

        if (typeof itemIndex === 'string') {
            setCurrentIndex(Number(itemIndex))
        }
    }, [visibleEntries])

    useEffect(() => {
        if (currentIndex === null || !navigationBarRef.current || !navigationItemsRef.current)
            return

        const navigationBar = navigationBarRef.current
        const targetItem = navigationItemsRef.current[currentIndex]

        const targetLeft = targetItem?.offsetLeft ?? 0
        const barWidth = navigationBar.offsetWidth
        const targetWidth = targetItem?.offsetWidth ?? 0

        const scrollLeft = targetLeft - barWidth / 2 + targetWidth / 2
        navigationBar.scrollTo({
            left: scrollLeft,
            behavior: 'smooth',
        })
    })

    return {
        navigationBarRef,
        navigationItemsRef,
        contentItemsRef,
        currentIndex,
        handleNavigationItemClick,
    }
}

export default useScrollSpy
