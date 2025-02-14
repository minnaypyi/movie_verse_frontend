import { ImageLoader } from '@app/components/common';
import { getCSSVar, getYear } from '@app/helpers';
import { useFavorites, useLogMovieView } from '@app/hooks';
import React from 'react';
import { HiStar } from 'react-icons/hi';
import LazyLoad from 'react-lazy-load';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const MovieCard = ({ movie, category, isLoading }) => {
  const { logMovieView, loading } = useLogMovieView(); // Use the hook to get the function
  const tmdbPosterPath = 'https://image.tmdb.org/t/p/w185_and_h278_face/';
  const { isFavorite, addToFavorites } = useFavorites();


  // // Function to log the movie view on click
  // const handleCardClick = async (tmdb_movie_id) => {
  //   const token = localStorage.getItem("authToken");
  //   if (!token) {
  //     toast.error("Please log in to view movie details");
  //     return;
  //   }

  //   try {
  //     // Make POST request to log the movie view
  //     const response = await axios.post(
  //       `http://${backendUrl}:8080/api/user-interactions/view/${tmdb_movie_id}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     toast.success(response.data); // Show success message from backend
  //   } catch (error) {
  //     console.error("Error logging movie view:", error);
  //     toast.error("Failed to log movie view");
  //   }
  // };


  const onClickCard = (e) => {
    if (isLoading) {
      e.preventDefault();
    }
    logMovieView(movie?.id); // Log the movie view when the card is clicked
  };

  return (
    <SkeletonTheme
      color={getCSSVar('--skeleton-theme-color')}
      highlightColor={getCSSVar('--skeleton-theme-highlight')}
    >
      <div className="card">
        <div className="card__rating">
          <HiStar className="card__rating-star" />
          <h4 className="card__rating-vote">{movie?.vote_average?.toFixed(1)}</h4>
        </div>
        <Link to={`/view/${category}/${movie?.id}`} onClick={onClickCard}>
          <div className="card__image">
            {movie ? (
              <LazyLoad debounce={false} offsetVertical={500}>
                <ImageLoader
                  alt={movie.original_title || movie.original_name || movie.title}
                  imgId={movie.id}
                  src={movie.poster_path ? `${tmdbPosterPath + movie.poster_path}` : '/img-placeholder.jpg'}
                />
              </LazyLoad>
            ) : (
              <Skeleton width={'100%'} height={'100%'} />
            )}
          </div>
        </Link>
        <div className="card__details">
          <h4>
            {movie ? movie.original_title || movie.original_name || movie.title || 'Not Available' : (
              <Skeleton width={'80%'} height={15} />
            )}
          </h4>
          <div className="card__footer">
            <p>
              {movie ? (
                getYear(movie.release_date) || getYear(movie.first_air_date) || 'N/A'
              ) : (
                <Skeleton width={50} />
              )}
            </p>
            {movie && (
              <>
                <button
                  className="button--add-favorite"
                  onClick={() => addToFavorites(movie)}
                >
                  <i
                    className="fa fa-heart"
                    style={{
                      color: isFavorite(movie.id) ? '#ff2e4f' : '#5b6166',
                    }}
                  />
                </button>
                <div className="tooltip">
                  <span>{isFavorite(movie.id) ? 'Remove from favorites' : 'Add To Favorites'}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default MovieCard;
