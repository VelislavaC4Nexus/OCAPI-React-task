import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  console.log("options",options);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = () => {
      setIsLoading(true);
      setError(null);

      fetch(url, options)
        .then((response) => {
          console.log('response', response);

          if (!response.ok) {
            console.log(error, 'hook');
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
          // if (options.onSuccess !== undefined) {
          //   options.onSuccess(responseData)
          // }
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
