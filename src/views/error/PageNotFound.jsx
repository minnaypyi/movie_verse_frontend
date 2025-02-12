import { useDocumentTitle } from '@app/hooks';
import React from 'react';

const PageNotFound = ({ history }) => {
  useDocumentTitle('404: Page Not Found');
  const returnHome = () => {
    history.push('/');
  };

  return (
    <div className="error">
      <h1>The Page You Requested Could Not Be Found</h1>
      <br />
      <button
        className="button--primary"
        onClick={returnHome}
      >
        Okay
      </button>
    </div>
  );
};

export default PageNotFound;
