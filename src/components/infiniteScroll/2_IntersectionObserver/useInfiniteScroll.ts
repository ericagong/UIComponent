import { useRef, useEffect } from 'react';
import useMockFetchAPI from '../useMockFetchAPI';
import useIntersectionObserver from '@/components/hook/useIntersectionObserver';

const IOOptions = {
  threshold: 1,
};
const useInfiniteScroll = () => {
  const moreRef = useRef<HTMLDivElement>(null);
  const { status, data, fetchMore } = useMockFetchAPI();
  const { entries } = useIntersectionObserver(moreRef, IOOptions);
  const isIntersecting = entries[0]?.isIntersecting || false;

  useEffect(() => {
    if (isIntersecting) fetchMore();
  }, [isIntersecting]);

  return { moreRef, status, data };
};

export default useInfiniteScroll;
