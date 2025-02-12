import { MovieCast, MovieOverview, MoviePoster, MovieReviews, SimilarMovies } from '@app/components/main';
import { useDidMount, useDocumentTitle } from '@app/hooks';
import { fetchSelectedMovie } from '@app/redux/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ViewMovie = ({ history, match }) => {
  const { movie, reviews, isLoading } = useSelector(state => ({
    movie: state.movies.current.movie,
    reviews: state.movies.current.reviews,
    isLoading: state.misc.isLoading
  }));
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const posters = movie?.images?.posters || [];

  useDocumentTitle(movie?.id ? `${movie.original_name || movie.original_title} | MOVX` : 'View Movie | MOVX');
  useEffect(() => {
    const movieId = match.params.id;
    fetchMovie(movieId);
  }, []);

  useEffect(() => {
    if (didMount || !movie) {
      fetchMovie(match.params.id);
    }
  }, [match.params.id]);

  const fetchMovie = (id) => {
    if (parseInt(id, 10) !== movie?.id) {
      dispatch(fetchSelectedMovie(match.params.category, id));
    }
  };

  const onClickViewImage = () => {
    history.push(`/view/movie/${match.params.id}/images`);
  };

  return !isLoading ? (
    <>
      <MovieOverview />
      <MovieCast />
      {movie?.images && (
        <div className="container__wrapper">
          <MoviePoster posters={posters.length > 10 ? posters.slice(0, 10) : posters} />
          <button
            className="button--primary button--block m-auto"
            onClick={onClickViewImage}
          >
            View All Posters
          </button>
        </div>
      )}
      <SimilarMovies movies={movie?.similar?.results || []} />
      <MovieReviews />
    </>
  ) : (
    <MovieOverview />
  );
};

export default ViewMovie;
