import { ReactEventHandler } from 'react'

import useLoading from '@/components/hook/useLoading'

import cx from '../cx'
import data from '../data'
import { LazyImageProps } from '../types'

export const LazyImage = ({ onLoad, onError, onClick, ...rest }: LazyImageProps) => {
    const { loading, setLoaded } = useLoading(true)

    const handleLoad: ReactEventHandler<HTMLImageElement> = e => {
        setLoaded()
        onLoad?.(e)
    }

    return (
        <img
            className={cx({ loading: loading })}
            loading="lazy"
            onLoad={handleLoad}
            onError={onError}
            onClick={onClick}
            {...rest}
        />
    )
}

const WIDTH = 600
const HEIGHT = 320

const LazyLoading = () => {
    return (
        <>
            <h2>지연 로딩</h2>
            <h3>#3. loading = lazy 속성 기반 구현</h3>
            {data.map((url, index) => (
                <LazyImage key={index} src={url} alt="" width={WIDTH} height={HEIGHT} />
            ))}
        </>
    )
}

export default LazyLoading
