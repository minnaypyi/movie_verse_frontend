import PosterCard from '@app/components/main/Poster/PosterCard';
import React from 'react';

const MoviePoster = ({ posters }) => {
  return (
    <div className="poster">
      <div className="poster__wrapper">
        <div className="poster__header header__title">
          <h1>Movie Posters</h1>
        </div>
        <div className="grid">
          {posters?.map((poster) => (
            <PosterCard key={poster.file_path} poster={poster} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviePoster;
