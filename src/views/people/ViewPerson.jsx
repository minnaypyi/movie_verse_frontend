import { Casting, PersonBiography } from '@app/components/main';
import { useDocumentTitle } from '@app/hooks';
import { fetchSelectedPerson } from '@app/redux/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ViewPerson = ({ match }) => {
  const actor = useSelector(state => state.people.current.actor);
  const dispatch = useDispatch();
  const actorId = match.params.id;

  useDocumentTitle(actor ? `${actor.name} Details` : 'View Person | MOVX');
  useEffect(() => {
    if (parseInt(actorId, 10) !== actor?.id) {
      dispatch(fetchSelectedPerson(actorId));
    }
  }, [actorId, actor, dispatch]);

  return actor ? (
    <>
      <PersonBiography />
      <Casting />
    </>
  ) : <PersonBiography />;
};

export default ViewPerson;
