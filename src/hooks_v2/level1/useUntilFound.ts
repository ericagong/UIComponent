import type { RefObject } from 'react'
import { useEffect } from 'react'

const useUntilFound = (targetRef: RefObject<HTMLElement | null>, isVisible: boolean) => {
    useEffect(() => {
        const $target = targetRef.current
        if (!$target) return

        if (!isVisible) {
            $target.setAttribute('hidden', 'until-found')
        } else {
            $target.removeAttribute('hidden')
        }
    }, [targetRef, isVisible])
}

export default useUntilFound
