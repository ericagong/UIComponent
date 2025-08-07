import { RefObject, useEffect } from 'react'

const useUntilFound = (contentRef: RefObject<HTMLElement | null>, isOpen: boolean) => {
    // hidden="until-found" 속성 HTML Element 강제 부여
    useEffect(() => {
        const $content = contentRef.current
        if (!$content) return

        if (!isOpen) $content.setAttribute('hidden', 'until-found')
        else $content.removeAttribute('hidden')
    }, [isOpen, contentRef])
}

export default useUntilFound
