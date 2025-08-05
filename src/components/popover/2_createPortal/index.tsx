import { useRef, useState } from 'react'

import useInfiniteScroll from '@/components/infiniteScroll/2_intersectionObserver/useInfiniteScroll'
import ViewportRectContextProvider from '@/context/ViewportRectContextProvider'

import cx from '../cx'
import Popover from './Popover'

const ListItem = ({ id, index, title }: { id: string; index: number; title: string }) => {
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <li id={id} className={cx('list-item')}>
            #{index + 1}. {title}
            <button
                className={cx('popover-trigger')}
                onClick={() => setIsOpen(true)}
                ref={triggerRef}
            />
            {isOpen && (
                <Popover
                    id={`${index + 1}`}
                    close={() => setIsOpen(false)}
                    anchorRef={triggerRef}
                />
            )}
        </li>
    )
}

const Popovers = () => {
    const { moreRef, status, data } = useInfiniteScroll()

    return (
        <ViewportRectContextProvider>
            <div className={cx('popovers')}>
                <h3>#1. 하위 요소로 popover 렌더링</h3>
                <div id="popovers-root" />
                <ul className={cx('list')}>
                    {data.map((page, i) =>
                        page.map((item, j) => <ListItem {...item} key={`${i}_${j}`} />)
                    )}
                </ul>
                <div ref={moreRef} />
                {status === 'LOADING' && <div>Loading...</div>}
            </div>
        </ViewportRectContextProvider>
    )
}

export default Popovers
