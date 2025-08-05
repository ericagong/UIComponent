import { useCallback, useEffect } from 'react';

import useMockFetchAPI from '../useMockFetchAPI';

// TODO useThrottle 적용하기: stale closure 이슈
const MORE_THRESHOLD = 10; // px
// const DELAY = 1000; // ms
const useInfiniteScroll = () => {
  const { status, data, fetchMore } = useMockFetchAPI();

  const handleInfiniteScroll = useCallback(() => {
    // console.count('handleInfiniteScroll called');
    if (status === 'LOADING') return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (documentHeight - (scrollTop + viewportHeight) <= MORE_THRESHOLD) {
      void fetchMore();
    }
  }, [status, fetchMore]);

  // const throttledHandleInfiniteScroll = useThrottle(
  //   handleInfiniteScroll,
  //   DELAY,
  // );

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    window.addEventListener('resize', handleInfiniteScroll);

    // 최초 렌더링 시 트리거
    handleInfiniteScroll();

    return () => {
      window.removeEventListener('scroll', handleInfiniteScroll);
      window.removeEventListener('resize', handleInfiniteScroll);
    };
  }, [handleInfiniteScroll]);

  return { status, data };
};

export default useInfiniteScroll;
