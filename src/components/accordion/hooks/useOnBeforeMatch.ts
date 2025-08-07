import { RefObject, useEffect } from 'react'

const useOnBeforeMatch = (
    contentRef: RefObject<HTMLElement | null>,
    handleBeforeMatch: () => void
) => {
    // ctrl+F 사용성 위한 beforematch 이벤트 처리
    useEffect(() => {
        const $content = contentRef.current

        if (!$content) return

        $content.addEventListener('beforematch', handleBeforeMatch)

        return () => $content.removeEventListener('beforematch', handleBeforeMatch)
    }, [handleBeforeMatch, contentRef])
}

export default useOnBeforeMatch
