import type { RefObject } from 'react'
import { useEffect } from 'react'

const useAttribute = <T extends HTMLElement>(
    targetRef: RefObject<T | null>,
    attribute: string,
    value: string | boolean | null
) => {
    useEffect(() => {
        const $target = targetRef.current
        if (!$target) return

        if (value === false || value === null) {
            $target.removeAttribute(attribute)
            return
        }

        if (value === true) {
            $target.setAttribute(attribute, '')
            return
        }

        $target.setAttribute(attribute, value)
    }, [targetRef, attribute, value])
}

export default useAttribute
