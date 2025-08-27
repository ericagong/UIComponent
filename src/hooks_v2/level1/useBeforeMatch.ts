import type { RefObject } from 'react'
import { useEffect } from 'react'

const useBeforeMatch = (targetRef: RefObject<HTMLElement | null>, onFound: () => void) => {
    useEffect(() => {
        const $target = targetRef.current
        if (!$target) return

        $target.addEventListener('beforematch', onFound)

        return () => $target.removeEventListener('beforematch', onFound)
    }, [targetRef, onFound])
}

export default useBeforeMatch
