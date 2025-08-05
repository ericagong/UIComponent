import SnackbarsContextProvider, { useSetSnackbar } from '@/context/SnackbarsContextProvider'

import cx from '../cx'
import data from '../data'

const SnackbarPanel = ({ id, index, content }: { id: string; index: number; content: string }) => {
    return (
        <p key={id} className={cx('panel')}>
            #{index + 1}. {content}
        </p>
    )
}

const SnackbarTrigger = ({
    id,
    index,
    content,
}: {
    id: string
    index: number
    content: string
}) => {
    const { upsertSnackbar } = useSetSnackbar()

    const showSnackbar = () => {
        upsertSnackbar(id, <SnackbarPanel id={id} index={index} content={content} />)
    }

    return (
        <span className={cx('trigger-container')}>
            <button className={cx('trigger')} id={id} onClick={showSnackbar}>
                #{index + 1}. 스낵바 띄우기
            </button>
        </span>
    )
}

const Snackbars = () => {
    return (
        <SnackbarsContextProvider>
            <h3>#1. Context API 기반 스낵바</h3>
            {data.map((d, idx) => (
                <SnackbarTrigger key={d.id} index={idx} {...d} />
            ))}
        </SnackbarsContextProvider>
    )
}

export default Snackbars
