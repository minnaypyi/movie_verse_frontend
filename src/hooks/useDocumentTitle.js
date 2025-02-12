import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    document.title = title || 'MOVX | Movie Browser';
  }, [title]);
};

export default useDocumentTitle;
