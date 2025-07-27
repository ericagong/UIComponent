import { ImgHTMLAttributes } from 'react';

type LazyImageProps = {
  src: string;
  width: number;
  height: number;
} & ImgHTMLAttributes<HTMLImageElement>;

export type { LazyImageProps };
