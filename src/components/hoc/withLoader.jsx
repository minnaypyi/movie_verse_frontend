import React from 'react';
import { isEmpty } from '@app/helpers/helperFunctions';
import LoadingScreen from '@app/components/common/Loader/ProgressLoader';

const withLoader = (propName) => (Component) => {
  return (props) => {
    const checkIfEmpty = () => {
      if (typeof propName === 'string') {
        return isEmpty(props[propName]);
      } else if (Array.isArray(propName)) {
        return propName.every((prop) => isEmpty(props[prop]));
      }
      return false;
    };

    return checkIfEmpty() && props.isLoading ? (
      <>
        <LoadingScreen />
        <Component {...props} />
      </>
    ) : (
      <Component {...props} />
    );
  };
};

export default withLoader;
