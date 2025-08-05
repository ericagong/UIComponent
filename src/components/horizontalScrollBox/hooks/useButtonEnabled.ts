import { useEffect, useState } from 'react'

import useIntersectionObserver from '@/components/hook/useIntersectionObserver'

export type ButtonDirection = 'prev' | 'next'
type ButtonEnabled = { prev: boolean; next: boolean }

const useButtonEnabled = (targetsRef: React.RefObject<(HTMLElement | null)[]>) => {
    const { visibleEntries } = useIntersectionObserver(targetsRef)
    const [buttonEnabled, setButtonEnabled] = useState<ButtonEnabled>({
        prev: true,
        next: true,
    })

    useEffect(() => {
        if (!visibleEntries.length) {
            setButtonEnabled({ prev: true, next: true })
            return
        }

        setButtonEnabled(prev => {
            const nextState = { ...prev }

            visibleEntries.forEach(entry => {
                const dir = (entry.target as HTMLElement).dataset.direction as ButtonDirection
                nextState[dir] = false
            })
            return nextState
        })
    }, [visibleEntries])

    return { prevEnabled: buttonEnabled.prev, nextEnabled: buttonEnabled.next }
}

export default useButtonEnabled
