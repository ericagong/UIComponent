import { RefObject, useEffect } from 'react'

/**
 * `Ctrl + F` 검색으로 숨겨진 콘텐츠를 찾아내고, 이를 열어주는 브라우저 대응 훅
 * - Chrome / Edge 등 Chromium 계열에서만 지원됨
 * - Safari / Firefox에서는 fallback 처리 필요
 */

const useSearchReveal = (
    contentRef: RefObject<HTMLElement | null>,
    isVisible: boolean,
    handleRevealBySearch: () => void
) => {
    useEffect(() => {
        const $content = contentRef.current
        if (!$content) return

        // 1. 숨기되 검색 대상이 되도록 처리
        if (!isVisible) {
            $content.setAttribute('hidden', 'until-found')
        } else {
            $content.removeAttribute('hidden')
        }

        // 2. 검색 매칭되었을 때 콘텐츠를 열 수 있도록 리스너 등록
        $content.addEventListener('beforematch', handleRevealBySearch)
        return () => $content.removeEventListener('beforematch', handleRevealBySearch)
    }, [contentRef, isVisible, handleRevealBySearch])
}

export default useSearchReveal
