import { useState, useCallback } from 'react';
import { waitFor, randomize, getRandomNumber } from './utils';
import mockData from './data';

export type Datum = {
  index: number;
  id: string;
  title: string;
  description: string;
};

type Status = 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';

type FetchResult<T> = {
  status: Status;
  data: T[][];
  fetchMore: () => Promise<void>;
};

const DATA_PER_PAGE = 10;
const MIN_DELAY = 300;
const MAX_DELAY = 1500;
const DELAY_STEP = 100;
const mockedFetchAPI = async (): Promise<Datum[]> => {
  const randomData = randomize(mockData, DATA_PER_PAGE);
  const randomDelay = getRandomNumber({
    min: MIN_DELAY,
    max: MAX_DELAY,
    step: DELAY_STEP,
  });
  await waitFor(randomDelay);
  return randomData;
};

const useMockFetchAPI = (): FetchResult<Datum> => {
  const [status, setStatus] = useState<Status>('IDLE');
  // 각 페이지별 데이터 별도 관리 위해 2차원 배열로 설정
  // cf) swr / tanstack-query: infiniteQuery => [ [20개], [20개], [20개]...]
  const [data, setData] = useState<Datum[][]>([]);

  const fetchMore = useCallback(async () => {
    setStatus('LOADING');

    try {
      const fetchedData = await mockedFetchAPI();
      setData((prev) => [...prev, fetchedData]);
      setStatus('SUCCESS');
    } catch (e) {
      setStatus('ERROR');
      throw new Error(`[FETCH ERROR] ${e}`);
    }
  }, []);

  return {
    status,
    data,
    fetchMore,
  };
};

export default useMockFetchAPI;
