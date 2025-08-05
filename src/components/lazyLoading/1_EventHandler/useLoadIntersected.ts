import { RefObject } from 'react'

const isIntersecting = ($target: HTMLElement) => {
    const rect = $target.getBoundingClientRect()
    // target 일부라도 viewport에 보이는 경우
    return rect.top < window.innerHeight && rect.bottom > 0
}

const useLoadIntersected = (targetRef: RefObject<HTMLImageElement | null>) => {
    return () => {
        const $img = targetRef.current
        // 이미 로드된 target 미처리
        if (!$img || $img.getAttribute('src')) return

        if (isIntersecting($img)) {
            $img.setAttribute('src', $img.dataset.src ?? '')
        }
    }
}

export default useLoadIntersected
