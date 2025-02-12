import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useDidMount from './useDidMount';

const usePageSaver = (path) => {
  const { pathname } = useLocation();
  const p = path || pathname.replace('/', '');
  const [currentPage, setCurrentPage] = useState(() => {
    const storageItem = localStorage.getItem('movxPage');
    return storageItem ? JSON.parse(storageItem)[p] || 1 : 1;
  });

  const didMount = useDidMount();

  useLayoutEffect(() => {
    const storageItem = localStorage.getItem('movxPage');

    if (storageItem) {
      const movxPage = JSON.parse(storageItem);
      const page = movxPage[p];

      if (page !== undefined) {
        setCurrentPage(page);
      }
    } else {
      localStorage.setItem(
        'movxPage',
        JSON.stringify({ [p]: currentPage })
      );
    }
  }, []);

  useEffect(() => {
    if (didMount) {
      const storageItem = localStorage.getItem('movxPage');
      if (storageItem) {
        const movxPage = JSON.parse(storageItem);
        localStorage.setItem(
          'movxPage',
          JSON.stringify({ ...movxPage, [p]: currentPage })
        );
      }
    }
  }, [currentPage, didMount]);

  return { currentPage, setCurrentPage };
};

export default usePageSaver;
