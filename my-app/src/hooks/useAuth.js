import { useState, useEffect } from 'react';

const optionsAuth = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-dw-client-id': `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
  },
  body :JSON.stringify({ type: 'guest' })
};

const useAuth = (url) => {
  const [token, setToken] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const existingToken = localStorage.getItem('token');
  // console.log(existingToken, 'existingToken');
  // let type;
  // if (existingToken === null || existingToken === undefined) {
  //   type = 'guest';
  // } else if (existingToken) {
  //   optionsAuth.headers.Authorization = existingToken;
  //   type = 'guest';
  // }
  // optionsAuth.body = JSON.stringify({ type: type });
  console.log(optionsAuth, 'optionsAuth');
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = () => {
      setIsLoading(true);
      setError(null);

      fetch(url, optionsAuth)
        .then((response) => {
          console.log('responseAUth', response.headers.get('authorization'));
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
  console.log(token, 'localStorage');
  localStorage.setItem('token', token);

  return { token, isLoading, error };
};
export default useAuth;
