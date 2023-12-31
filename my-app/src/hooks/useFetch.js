import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const fetchData = () => {
      setIsLoading(true);
      setError(null);

      fetch(url, { ...options, signal })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error(response.status);
            } else {
              throw new Error('Something went wrong');
            }
          }

          return response.json();
        })
        .then((responseData) => {
          setData(responseData);
        })
        .catch((err) => {
          setError(err.message || 'An error occurred.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, setData, isLoading, error };
};
export default useFetch;
