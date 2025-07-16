import { useState } from 'react';

const useLoading = (initialLoading: boolean = false) => {
  const [loading, setLoading] = useState(initialLoading);
  const setLoaded = () => setLoading(false);

  return {
    loading,
    setLoaded,
  };
};

export default useLoading;
