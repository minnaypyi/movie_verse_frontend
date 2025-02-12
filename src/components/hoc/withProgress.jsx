import { setLoading } from '@app/redux/actions/miscActions';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const ProgressTrigger = (Component) => (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      dispatch(setLoading(false));
    };
  }, [props.match?.location]);

  return <Component {...props} />;
};

export default ProgressTrigger;
