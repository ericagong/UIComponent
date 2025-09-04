import type { RefObject } from 'react'

import useEventListener from '@/features/common/atomic/useEventListener'

import useAttribute from '../atomic/useAttribute'

const useFoundReveal = (
    targetRef: RefObject<HTMLElement | null>,
    isVisible: boolean,
    handleFound: () => void
) => {
    useAttribute(targetRef, 'hidden', isVisible ? null : 'until-found')

    useEventListener(targetRef, 'beforematch', handleFound)
}

export default useFoundReveal
