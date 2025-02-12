import React from 'react';
import { Link } from 'react-router-dom';

const GenreCard = ({ genre }) => {
  const { id, name } = genre;
  const genreName = name.split(' ')[0].toLowerCase();

  return (
    <div
      className="genre__card"
      style={{
        background: `url(/${genreName}.jpg)`,
      }}
    >
      <Link to={`/genre/${name.toLowerCase().replace(' ', '-')}/${id}`}>
        <h1>{name || 'Not Available'}</h1>
      </Link>
    </div>
  );
};

export default GenreCard;
