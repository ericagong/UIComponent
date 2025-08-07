import { KeyboardEvent } from 'react'

const useArrowKeyNavigation = (
    index: number,
    openTab: (index: number) => void,
    tabRefs: React.RefObject<(HTMLButtonElement | null)[]>
) => {
    const tabsLength = tabRefs.current.length

    const navigate = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return

        const moveBy = e.key === 'ArrowRight' ? 1 : -1
        const nextIndex = (index + moveBy + tabsLength) % tabsLength

        openTab(nextIndex)

        tabRefs.current[nextIndex]?.focus()
    }

    return { navigate }
}

export default useArrowKeyNavigation
