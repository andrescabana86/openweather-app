import { useState, useEffect } from 'react';

/**
 * useDebounce custom hook debounce a callback
 * function for 500ms for certain value state
 * @param value {string}
 */
export const useDebounce = (value: string) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
      const handler = setTimeout(() => {
        setDebounced(value);
      }, 500);

      return () => {
        clearTimeout(handler);
      };
    }, [value]
  );

  return debounced;
};