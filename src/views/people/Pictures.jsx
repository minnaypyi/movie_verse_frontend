import { PersonProfiles } from '@app/components/main';
import { useDocumentTitle } from '@app/hooks';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Pictures = ({ history }) => {
  const actor = useSelector(state => state.people.current.actor);

  useDocumentTitle('Profile Pictures');
  useEffect(() => {
    if (!actor) {
      history.goBack();
    }
  }, [actor, history]);

  return !actor ? null : (
    <>
      <div className="posters__banner">
        <img src="/background.jpg" alt="" />
        <div className="posters__banner-content">
          <h1>{actor.name}</h1>
          <button
            className="button--back"
            onClick={history.goBack}>
            Back
          </button>
        </div>
      </div>
      <div className="container__wrapper">
        <PersonProfiles />
      </div>
    </>
  );
};

export default Pictures;
