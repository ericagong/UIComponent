import { useCallback, useRef } from 'react'

import useStable from '@/components/hook/useStable'

export default function useThrottle(fn: () => void, delay = 1000) {
    const stableFn = useStable(fn)
    const lastCallRef = useRef(0)

    const throttledFn = useCallback(() => {
        const now = Date.now()
        if (now - lastCallRef.current >= delay) {
            lastCallRef.current = now
            stableFn()
        }
    }, [delay, stableFn])

    return throttledFn
}
