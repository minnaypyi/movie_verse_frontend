import ImageLoader from '@app/components/common/Loader/ImageLoader';
import { getCSSVar } from '@app/helpers/helperFunctions';
import React from 'react';
import { HiStar } from 'react-icons/hi';
// @ts-ignore
import LazyLoad from 'react-lazy-load';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchGenres } from "@app/redux/actions";
import { useLogMovieView } from '@app/hooks'; // Import the hook

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
const tmdbBackdropPath = 'https://image.tmdb.org/t/p/original';

const MovieSliderItem = ({ movie }) => {
  const { logMovieView, loading } = useLogMovieView(); // Use the hook
  const history = useHistory();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genre.genres);
  console.log("Genres from Redux:", genres);
  useEffect(() => {
    if (genres.length === 0) {
      console.log("🚀 Dispatching fetchGenres()...");
      dispatch(fetchGenres());
    }
  }, [dispatch, genres.length]);
  const handleViewMovieClick = () => {
    logMovieView(movie?.id); // Log the movie view when the button is clicked
    history.push(`/view/movie/${movie.id}`); // Redirect to movie details page
  };
  return (
    <SkeletonTheme
      color={getCSSVar('--skeleton-theme-color')}
      highlightColor={getCSSVar('--skeleton-theme-highlight')}
    >
      <div className="container__wrapper movie__slider-wrapper">
        {movie && (
          <div className="movie__slider-backdrop">
            <img alt="" src={tmdbBackdropPath + movie.backdrop_path} />
          </div>
        )}
        <div className="movie__slider-content">
          <div className="movie__slider-description">
            <h1>{movie?.original_title || <Skeleton width={'50%'} />}</h1>
            <p className="movie__slider-rating">
              {movie?.vote_average ? (
                <>
                  <HiStar className="movie__slider-rating-star" />
                  &nbsp;{movie.vote_average} Rating
                </>
              ) : (
                <Skeleton width={'30%'} />
              )}
            </p>

            <p className="movie__slider-genre">
              {movie?.genre_ids
                ? movie.genre_ids.map((a) => {
                    const genre = genres.find((b) => b.id === a);
                    return (
                      <Link key={a} className="movie__slider-genre-pill" to={`/genre/${genre?.name}/${a}`}>
                        {genre?.name}
                        
                      </Link>
                    );
                  })
                : <Skeleton width={'25%'} />}
            </p>
            
            <p className="view__overview mt-0">
              {movie?.overview || <Skeleton count={4} />}
            </p>
            <br />
            <div className="movie__slider-button">
              {movie?.id ? (
                <button className="button--primary" onClick={handleViewMovieClick}>
                  View Movie
                </button>
              ) : (
                <Skeleton width={150} height={50} />
              )}
            </div>
          </div>
          <div className="view__poster">
            {movie ? (
              //<LazyLoad debounce={false} offsetVertical={500} visibleByDefault={true}>
                <ImageLoader
                  alt={movie.original_title || movie.original_name || movie.title}
                  imgId={movie.id}
                  src={movie.poster_path ? `${tmdbPosterPath + movie.poster_path}` : '/img-placeholder.jpg'}
                />
              //</LazyLoad>
            ) : (
              <LazyLoad debounce={false} offsetVertical={500}>
                <Skeleton width={'100%'} height={'100%'} />
              </LazyLoad>
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default MovieSliderItem;
