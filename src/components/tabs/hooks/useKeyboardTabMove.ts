import { KeyboardEvent } from 'react'

const useKeyboardTabMove = (
    index: number,
    setOpenIndex: (index: number) => void,
    tabRefs: React.RefObject<(HTMLButtonElement | null)[]>
) => {
    const tabsLength = tabRefs.current.length

    const moveToNextTab = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return

        const moveBy = e.key === 'ArrowRight' ? 1 : -1
        const nextIndex = (index + moveBy + tabsLength) % tabsLength

        setOpenIndex(nextIndex)

        tabRefs.current[nextIndex]?.focus()
    }

    return { moveToNextTab }
}

export default useKeyboardTabMove
