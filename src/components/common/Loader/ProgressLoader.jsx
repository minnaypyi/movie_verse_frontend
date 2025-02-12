import React from 'react';

const ProgressLoader = ({ message }) => (
  <div className="loading__wrapper">
    <div className="loading__body">
      <div className="loading__circular" />
      <span>{message || 'Loading'}</span>
    </div>
  </div>
);

export default ProgressLoader;
