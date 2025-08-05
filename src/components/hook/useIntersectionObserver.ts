import { RefObject, useEffect, useRef, useState } from 'react'

type Target = Element | null

const DefaultIOOptions: IntersectionObserverInit = {
    threshold: 0,
}

const useIntersectionObserver = (
    targetsRef: RefObject<Target | Target[]>,
    options: IntersectionObserverInit = DefaultIOOptions
) => {
    const observerRef = useRef<IntersectionObserver | null>(null)
    const [visibleEntries, setVisibleEntries] = useState<IntersectionObserverEntry[]>([])

    useEffect(() => {
        if (!targetsRef.current) return

        const handleIntersect = (newEntries: IntersectionObserverEntry[]) => {
            setVisibleEntries(prev => {
                const duplicableEntries = [...prev, ...newEntries]

                const entryMap = new Map(duplicableEntries.map(e => [e.target, e]))

                const uniqueEntries = Array.from(entryMap.values())

                const visibleEntries = uniqueEntries.filter(e => e.isIntersecting)

                return visibleEntries
            })
        }

        const observer = new IntersectionObserver(handleIntersect, options)
        observerRef.current = observer

        const targets = Array.isArray(targetsRef.current)
            ? targetsRef.current
            : [targetsRef.current]

        targets.forEach($target => {
            if ($target) {
                observer.observe($target)
            }
        })
    }, [targetsRef, options])

    return {
        observerRef,
        visibleEntries,
    }
}

export default useIntersectionObserver
