import type { RefObject } from 'react'

import useAttribute from '@/features/common/useAttribute'
import useEventListener from '@/features/common/useEventListener'

const useFoundReveal = (
    targetRef: RefObject<HTMLElement | null>,
    isVisible: boolean,
    handleFound: () => void
) => {
    useAttribute(targetRef, 'hidden', isVisible ? null : 'until-found')

    useEventListener(targetRef, 'beforematch', handleFound)
}

export default useFoundReveal
