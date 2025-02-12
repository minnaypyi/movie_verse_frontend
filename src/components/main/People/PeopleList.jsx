import React from 'react';
import PeopleCard from './PersonCard';

const PeopleList = ({ people, gridClass = 'grid', templateCount = 0 }) => {
  return (
    <div className={gridClass}>
      {people.length === 0 && templateCount !== 0
        ? new Array(templateCount).fill({}).map((_, index) => (
            <PeopleCard key={`skeleton_people_${index}`} data={null} />
          ))
        : people.map((person, index) => (
            <PeopleCard key={`${person.id}_${index}`} data={person} />
          ))}
    </div>
  );
};

export default PeopleList;
