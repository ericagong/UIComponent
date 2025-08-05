import { useEffect, useRef } from 'react'

import useIntersectionObserver from '@/components/hook/useIntersectionObserver'

import useMockFetchAPI from '../useMockFetchAPI'

const IOOptions = {
    threshold: 1,
}
const useInfiniteScroll = () => {
    const moreRef = useRef<HTMLDivElement>(null)
    const { status, data, fetchMore } = useMockFetchAPI()
    const { visibleEntries } = useIntersectionObserver(moreRef, IOOptions)
    const targetEntry = visibleEntries[0]
    const isIntersecting = targetEntry?.isIntersecting || false

    useEffect(() => {
        if (isIntersecting) void fetchMore()
    }, [isIntersecting, fetchMore])

    return { moreRef, status, data }
}

export default useInfiniteScroll
