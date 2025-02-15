import { MovieList, MovieSlider } from '@app/components/main';
import { useDocumentTitle } from '@app/hooks';
import { fetchMainMovies } from '@app/redux/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Home = ({ history }) => {
  const {
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    recommendedMovies,
  } = useSelector(state => ({
    popularMovies: state.movies.popular,
    topRatedMovies: state.movies.topRated,
    upcomingMovies: state.movies.upcoming,
    favorites: state.favorites,
    recommendedMovies: state.movies.recommended,
  }));
  const dispatch = useDispatch();
  const isAuthenticated = !!localStorage.getItem("authToken"); // Assuming store the token in localStorage
  useDocumentTitle();
  useEffect(() => {
    if (!popularMovies || !topRatedMovies || !upcomingMovies || !recommendedMovies) {
      dispatch(fetchMainMovies());
    }
  }, [dispatch, popularMovies, topRatedMovies, upcomingMovies, recommendedMovies]);

  return (
    <>
      <MovieSlider movies={popularMovies?.results || []} />
      <div className="container__wrapper">
        {/* {isAuthenticated && recommendedMovies && recommendedMovies.results?.length > 0 ? (
          <>
            <div className="movie__header">
              <div className="movie__header-title header__title">
                <br /><br />
                <h1>Recommended Movies</h1>
              </div>
            </div>
            <MovieList movies={recommendedMovies.results.slice(0, 5)} />
            <button
              className="button--primary m-auto"
              onClick={() => history.push('/recommended-movies')}
            >
              View All Recommended Movies
            </button>
          </>
        ): (
          isAuthenticated && (
            <p>No recommended movies available at the moment.</p> // Fallback message when no recommended movies
          )
        )} */}
        {isAuthenticated && (
          <>
            <div className="movie__header">
              <div className="movie__header-title header__title">
                <br /><br />
                <h1>Recommended Movies</h1>
              </div>
            </div>
            {recommendedMovies?.results?.length > 0 ? (
              <>
                <MovieList movies={recommendedMovies.results.slice(0, 5)} />
                <button
                  className="button--primary m-auto"
                  onClick={() => history.push('/recommended-movies')}
                >
                  View All Recommended Movies
                </button>
              </>
            ) : (
              <p>No recommended movies available at the moment. Make some interactions.</p> // Fallback message
            )}
          </>
        )}
        {upcomingMovies && (
          <>
            <div className="movie__header">
              <div className="movie__header-title header__title">
                <br /><br />
                <h1>Upcoming Movies</h1>
              </div>
            </div>
            <MovieList movies={upcomingMovies.results.slice(0, 5)} />
            <button
              className="button--primary m-auto"
              onClick={() => history.push('/upcoming')}
            >
              View All Upcoming Movies
            </button>
          </>
        )}
        {topRatedMovies && (
          <>
            <div className="movie__header">
              <div className="movie__header-title header__title">
                <br />
                <br />
                <h1>Top Rated Movies</h1>
              </div>
            </div>
            <MovieList movies={topRatedMovies.results.slice(0, 5)} />
            <button
              className="button--primary m-auto"
              onClick={() => history.push('/top_rated')}
            >
              View All Top Rated Movies
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
