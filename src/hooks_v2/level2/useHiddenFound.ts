import type { RefObject } from 'react'

import useBeforeMatch from '@/hooks_v2/level1/useBeforeMatch'
import useUntilFound from '@/hooks_v2/level1/useUntilFound'

const useHiddenFound = (
    targetRef: RefObject<HTMLElement | null>,
    isVisible: boolean,
    onFound: () => void
) => {
    useUntilFound(targetRef, isVisible)
    useBeforeMatch(targetRef, onFound)
}

export default useHiddenFound
