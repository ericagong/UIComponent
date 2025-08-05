import { ImgHTMLAttributes, RefObject } from 'react'

type LazyImageProps = {
    src: string
    width: number
    height: number
    rootElementRef?: RefObject<HTMLElement>
} & ImgHTMLAttributes<HTMLImageElement>

export type { LazyImageProps }
