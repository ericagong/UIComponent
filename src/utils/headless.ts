import type { Ref, SyntheticEvent } from 'react'

// 내부 이벤트 핸들러 우선 실행 -> 외부 이벤트 핸들러 실행 정책
// 외부 e.preventDefault 시 멈춤 여부는 internal 함수 내부에서 자체적으로 조절
const mergeEventHandlers = <T extends SyntheticEvent>(
    internal?: (e: T) => void,
    external?: (e: T) => void
) => {
    return (e: T) => {
        internal?.(e)
        external?.(e)
    }
}

const mergeRefs = <T>(...refs: Array<Ref<T> | undefined>) => {
    return ($element: T) => {
        refs.forEach(ref => {
            if (!ref) return
            if (typeof ref === 'function') ref($element)
            else ref.current = $element
        })
    }
}

export { mergeEventHandlers, mergeRefs }
