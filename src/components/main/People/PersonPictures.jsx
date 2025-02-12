import PosterCard from '@app/components/main/Poster/PosterCard';
import React from 'react';
import { useSelector } from 'react-redux';

const PersonPictures = () => {
  const posters = useSelector((state) => state.people.current.actor?.images.profiles);

  return posters && posters.length >= 1 ? (
    <>
      <div className="poster__header header__title">
        <h1>Profile Images</h1>
      </div>
      <div className="grid">
        {posters.map((poster) => (
          <PosterCard key={poster.file_path} poster={poster} />
        ))}
      </div>
    </>
  ) : (
    <div className="search__no-result">
      <h1>No posters found.</h1>
    </div>
  );
};

export default PersonPictures;
