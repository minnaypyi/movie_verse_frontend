import { useDocumentTitle } from '@app/hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';

const PageError = () => {
  useDocumentTitle('Error 😥');
  const history = useHistory();

  const back = () => {
    history.push('/discover');
  };

  return (
    <div className="error">
      <h1>Page Cannot Be Displayed</h1>
      <p>A problem was encountered while fetching the data</p>
      <button
        className="button--primary"
        onClick={back}
      >
        Okay
      </button>
    </div>
  );
};

export default PageError;
