import React from 'react';
import MovieList from './MovieList';

const SimilarMovies = ({ movies }) => {
  return movies.length === 0 ? null : (
    <div className="similar">
      <div className="container__wrapper similar__wrapper">
        <div className="poster__header header__title">
          <h1>Similar Movies</h1>
        </div>
        <MovieList category="movie" movies={movies} />
      </div>
    </div>
  );
};

export default SimilarMovies;
