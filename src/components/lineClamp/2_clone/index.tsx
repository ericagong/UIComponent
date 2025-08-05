import { useEffect, useRef, useState } from 'react'

import cx from '../cx'
import data from '../data'

const LineClampedText = ({
    id,
    text,
    maxLines,
}: {
    id: string
    text: string
    maxLines: number
}) => {
    const cloneRef = useRef<HTMLDivElement>(null)
    const elemRef = useRef<HTMLDivElement>(null)
    const [isClamped, setIsClamped] = useState(true)

    useEffect(() => {
        if (elemRef.current && cloneRef.current) {
            const scrollHeight = cloneRef.current.scrollHeight
            const lineHeight = parseInt(getComputedStyle(elemRef.current).lineHeight)
            const totalmaxLines = Math.floor(scrollHeight / lineHeight)
            setIsClamped(totalmaxLines > maxLines)
        }
    }, [text, maxLines])

    return (
        <div
            className={cx('content', { clamped: isClamped })}
            aria-expanded={!isClamped}
            aria-describedby={id}
        >
            <div className={cx('text-clone')} ref={cloneRef}>
                {text}
            </div>
            <div className={cx('text')} id={id} ref={elemRef} style={{ WebkitLineClamp: maxLines }}>
                {text}
            </div>
            {isClamped && (
                <button
                    className={cx('more-button')}
                    onClick={() => setIsClamped(false)}
                    aria-label="전체 텍스트 펼치기"
                    aria-expanded="false"
                    aria-controls={id}
                />
            )}
        </div>
    )
}

const MAX_LINE_COUNT = 3
const LineClamp = () => {
    return (
        <>
            <h3>#2. Uncontrolled Line Clamp(Clone Element 기반 줄 개수 계산)</h3>
            {data.map(d => (
                <LineClampedText {...d} key={d.id} maxLines={MAX_LINE_COUNT} />
            ))}
        </>
    )
}

export default LineClamp
