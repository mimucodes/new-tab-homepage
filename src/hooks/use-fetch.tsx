import { useEffect, useState } from 'react';

type State<T> = {
  status: string;
  data?: T;
};

export function useFetch<T = unknown>(url: string): State<T> {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setStatus('fetching');

      try {
        const response = await fetch(url);
        setData(await response?.json());
        setStatus('fetched');
      } catch (error) {
        setStatus('error');
        console.log(error);
      }
    };

    fetchData();
  }, [url]);

  return { status, data };
}
