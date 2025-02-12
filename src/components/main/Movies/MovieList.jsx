import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';

const MovieList = ({ movies, category = 'movie', gridClass = 'grid', templateCount = 0 }) => {
  const isLoading = useSelector((state) => state.misc.isLoading);

  return (
    <div className={gridClass}>
      {movies.length === 0 && templateCount !== 0
        ? new Array(templateCount).fill({}).map((_, index) => (
            <MovieCard category={category} isLoading={isLoading} key={`skeleton_movie_${index}`} movie={null} />
          ))
        : movies.map((movie, index) => (
            <MovieCard category={movie.media_type || category} isLoading={isLoading} key={`${movie.id}_${index}`} movie={movie} />
          ))}
    </div>
  );
};

export default MovieList;
