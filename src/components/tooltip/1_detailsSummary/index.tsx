import { useEffect, useRef } from 'react'

import useAutoPlacement from '@/components/hook/useAutoPlacement'
import ViewportRectContextProvider from '@/context/ViewportRectContextProvider'

import cx from '../cx'
import data from '../data'

const preferredTooltipPosition = {
    top: '100%', // 아래쪽으로 띄울 땐 top에서 100% 떨어지게 (바로 아래)
    right: 0, // 왼쪽으로 띄울 땐 오른쪽에 딱 붙게
    bottom: 20, // 위로 띄울 땐 bottom에서 20px 띄우기 (살짝 간격)
    left: 0, // 오른쪽으로 띄울 땐 왼쪽에 딱 붙게
}

const Tooltip = ({
    id,
    title,
    description,
}: {
    id: string
    title: string
    description: string
}) => {
    const tooltipId = `tooltip-${id}`
    const anchorRef = useRef<HTMLDetailsElement>(null)
    const floatingRef = useRef<HTMLDivElement>(null)

    const style = useAutoPlacement(anchorRef, floatingRef, preferredTooltipPosition)

    return (
        <details className={cx('provider')} ref={anchorRef} data-tooltip={id}>
            <summary
                className={cx('trigger')}
                aria-controls={tooltipId}
                aria-expanded={anchorRef.current?.open ?? false}
                aria-describedby={tooltipId}
                tabIndex={0}
            >
                {title}
            </summary>
            <div
                className={cx('content')}
                ref={floatingRef}
                onClick={e => e.stopPropagation()}
                style={style}
                id={tooltipId}
                role="tooltip"
            >
                {description}
            </div>
        </details>
    )
}

const Tooltips = () => {
    useEffect(() => {
        const closeAllTooltips = (e: Event) => {
            const $triggerEl = e.target as HTMLElement
            document.querySelectorAll('[data-tooltip]').forEach($el => {
                if ($el !== $triggerEl.parentElement) {
                    $el.removeAttribute('open')
                }
            })
        }

        window.addEventListener('click', closeAllTooltips)
        return () => {
            window.removeEventListener('click', closeAllTooltips)
        }
    }, [])
    return (
        <ViewportRectContextProvider>
            <>
                <h3>#1. Click 이벤트 기반 툴팁(details summary 태그 기반 구현)</h3>
                {data.map(d => (
                    <Tooltip key={d.id} {...d} />
                ))}
            </>
        </ViewportRectContextProvider>
    )
}

export default Tooltips
