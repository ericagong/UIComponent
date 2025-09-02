// 이벤트 발생 위치 targets 내부 여부 판정
// Shadow DOM/포털 사용 시에도 안전
const isEventInTargets = (e: Event, ...targetElems: Array<HTMLElement | null | undefined>) => {
    const path = e.composedPath?.() ?? []

    const isTargetClicked = targetElems.some(
        $target => $target && (path.includes($target) || $target.contains(e.target as Node))
    )

    return isTargetClicked
}

// 순수한 왼쪽 마우스 클릭인지 판단
// 보조 버튼 눌림, 수정키 제외
const isStandardMouseLeftClick = (e: MouseEvent | PointerEvent): boolean => {
    return e.button === 0 && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey
}

const isFocusable = (el: HTMLElement | null): el is HTMLElement => {
    if (!el) return false
    const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'textarea:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ]
    return el.matches(focusableSelectors.join(','))
}

export { isEventInTargets, isFocusable, isStandardMouseLeftClick }
