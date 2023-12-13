import { useState, useEffect } from 'react';
import { urlConstants } from '../utils/urlConstants';


const optionsAuth = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-dw-client-id': urlConstants().CLIENT_ID,
  },
  body: JSON.stringify({ type: 'guest' })
};

const useAuth = (url) => {
  const [token, setToken] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = () => {
      setIsLoading(true);
      setError(null);

      fetch(url, { ...optionsAuth, signal })
        .then((response) => {
          setToken(response.headers.get('authorization'));
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error(response.status);
            } else {
              throw new Error('Something went wrong');
            }
          }

          return token;
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
  localStorage.setItem('token', token);
  return { token, isLoading, error };
};

export default useAuth;
