import { useLayoutEffect } from "react";

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    document.title = title || "MOVIEVERSE | Movie Browser";
  }, [title]);
};

export default useDocumentTitle;
