'use client'

import { type RefObject, useEffect } from 'react'

type Target = Window | Document | HTMLElement

const getTargetElement = (target: Target | RefObject<Target | null>): Target | null => {
    if (!target) return null
    if ('current' in target) return target.current
    return target
}

const useEventListener = <
    K extends keyof WindowEventMap & keyof DocumentEventMap & keyof HTMLElementEventMap,
>(
    target: Target | RefObject<Target | null>,
    type: K,
    listener: (ev: any) => void,
    options?: boolean | AddEventListenerOptions
) => {
    useEffect(() => {
        if (typeof window === 'undefined') return

        const element = getTargetElement(target)
        if (!element) return

        element.addEventListener(type, listener, options)

        return () => {
            element.removeEventListener(type, listener, options)
        }
    }, [target, type, listener, options])
}

export default useEventListener
