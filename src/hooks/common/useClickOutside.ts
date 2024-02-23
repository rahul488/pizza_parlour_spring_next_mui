'use client';
import { useEffect } from 'react';

const useClickOutSide = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  const handleClick = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]); // eslint-disable-line
};

export default useClickOutSide;
