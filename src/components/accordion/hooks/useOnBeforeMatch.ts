import { RefObject, useEffect } from 'react'

const useOnBeforeMatch = (contentRef: RefObject<HTMLElement | null>, onBeforeMatch: () => void) => {
    // ctrl+F 사용성 위한 beforematch 이벤트 처리
    useEffect(() => {
        const $content = contentRef.current
        if (!$content) return
        $content.addEventListener('beforematch', onBeforeMatch)
        return () => $content.removeEventListener('beforematch', onBeforeMatch)
    }, [onBeforeMatch, contentRef])
}

export default useOnBeforeMatch
