import { useDocumentTitle } from '@app/hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';

const NetworkError = () => {
  useDocumentTitle('Network Error');
  const history = useHistory();

  const returnHome = () => {
    history.push('/');
  };

  return (
    <div className="error">
      <h1>Network Error</h1>
      <p>It looks like you don't have an internet connection</p>
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

export default NetworkError;
