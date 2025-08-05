import { useEffect, useRef, useState } from 'react'

import { LazyImage } from '@/components/lazyLoading/4_polyfill'

import cx from '../cx'
import data from '../data'

type Direction = 'left' | 'right'
const slideLength = data.length
const SLIDE_WIDTH = 600

const ImageSlide = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const rootElementRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLUListElement>(null)

    const move = (direction: Direction) => {
        setCurrentIndex(prevIndex => {
            const moveBy = direction === 'right' ? 1 : -1
            const nextIndex = (prevIndex + moveBy + slideLength) % slideLength
            trackRef.current!.scrollTo({
                left: nextIndex * SLIDE_WIDTH,
                behavior: 'smooth',
            })
            return nextIndex
        })
    }

    useEffect(() => {
        if (trackRef.current) trackRef.current.scrollLeft = 0
    }, [])

    return (
        <>
            <h3>#2. scroll-snap 기반 이동 이미지 슬라이드</h3>
            <div className={cx('imageSlide')} ref={rootElementRef}>
                <ul className={cx('track', 'scrollSnapTrack')} ref={trackRef}>
                    {data.map((url, index) => (
                        <li key={index} className={cx('slide', 'scrollSnapSlide')}>
                            <LazyImage
                                className={cx('content')}
                                src={url}
                                width={SLIDE_WIDTH}
                                height={320}
                                rootElementRef={rootElementRef}
                            />
                            <span className={cx('label')}>#{index + 1}</span>
                        </li>
                    ))}
                </ul>
                <button
                    className={cx('moveTrigger', 'moveLeft')}
                    onClick={() => move('left')}
                    disabled={currentIndex === 0}
                />
                <button
                    className={cx('moveTrigger', 'moveRight')}
                    onClick={() => move('right')}
                    disabled={currentIndex === slideLength - 1}
                />
            </div>
        </>
    )
}

export default ImageSlide
