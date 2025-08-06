import { ReactNode } from 'react'

import cx from '../cx'

const TabsList = ({ children }: { children: ReactNode }) => {
    return (
        <div role="tablist" className={cx('tabs-list')}>
            {children}
        </div>
    )
}

export default TabsList
