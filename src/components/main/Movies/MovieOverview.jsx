import ImageLoader from '@app/components/common/Loader/ImageLoader';
import { getCSSVar, getYear } from '@app/helpers/helperFunctions';
import useFavorites from '@app/hooks/useFavorites';
import useWatched from '@app/hooks/useWatched';
import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazy-load';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import Modal from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import { Link, useHistory, useParams } from 'react-router-dom';
import { Star } from "lucide-react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
const tmdbBackdropPath = 'https://image.tmdb.org/t/p/original';

const MovieOverview = () => {
  const movie = useSelector((state) => state.movies.current.movie);
  const history = useHistory();
  //const dispatch = useDispatch();
  const { isFavorite, addToFavorites } = useFavorites();
  const { isWatched, handleAddToWatched } = useWatched(); // Add similar logic for watched movies
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  
  // Fetch user authentication details
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [tmdbMovie, setTmdbMovie] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('username'); 

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  // Handle "Give Review" button click
  const handleGiveReview = () => {
    if (!token || !user) {
      toast.dismiss();
      toast.error("Please log in");
      return; // Prevent modal from opening if not logged in
    }
    
    setTmdbMovie(movie); // Set the movie for the review
    setIsModalOpen(true); // Open the modal if logged in
  };

  useEffect(() => {
    if (isModalOpen && tmdbMovie) {
      // Fetch the existing review and rating from the backend
      const fetchReviewData = async () => {
        try {
          // Fetch the rating
          const ratingResponse = await axios.get(
            `http://${backendUrl}:8080/api/ratings/${tmdbMovie.id}/user`, 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (ratingResponse.data) {
            setRating(ratingResponse.data.rating || 0); // Assuming the rating is in the response
          }
        } catch (error) {
          console.warn("No rating found or error fetching rating:", error);
        }
        try {
        // Fetch the review
        const reviewResponse = await axios.get(
          `http://${backendUrl}:8080/api/reviews/${tmdbMovie.id}/user`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (reviewResponse.data) {
          setReview(reviewResponse.data.editedReviewText || reviewResponse.data.originalReviewText || "");
          setIsEdit(reviewResponse.data.editedReviewText ? true : false); // Set edit flag if review is edited
        }
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchReviewData();
  }
}, [isModalOpen, tmdbMovie, token]);



  const handleRating = (star) => setRating(star);

  const handleSubmitReview = async () => {
    if (!user || !token) {
      toast.dismiss();
      toast.error("Please log in");
      return;
    }

    try {
      let reviewSubmitted = false;
    let ratingSubmitted = false;
      if (review.trim()) {
      await axios.post(
        `http://${backendUrl}:8080/api/reviews/${tmdbMovie.id}?reviewText=${encodeURIComponent(review)}&isEdit=${isEdit}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      reviewSubmitted = true;
    } else {
      // Send DELETE request if review is empty
      await axios.delete(
        `http://${backendUrl}:8080/api/reviews/${tmdbMovie.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      reviewSubmitted = true;
    
    }
    if (rating > 0) {
      await axios.post(
        `http://${backendUrl}:8080/api/ratings/${tmdbMovie.id}?rating=${rating}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    }
    ratingSubmitted = true;
    if (reviewSubmitted || ratingSubmitted) {
      toast.success("Review & Rating submitted successfully!");
    } else {
      toast.warn("Nothing to submit! Please enter a rating or review.");
    }

      console.log("Review & Rating submitted!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting review/rating:", error);
      alert("Failed to submit review and rating.");
    }
  };

  return (
    <SkeletonTheme
      color={getCSSVar('--skeleton-theme-color')}
      highlightColor={getCSSVar('--skeleton-theme-highlight')}
    >
      <div className="movie__overview">
        <div className="container__wrapper movie__overview-wrapper">
          {movie?.id && (
            <div className="backdrop__container">
              <img
                alt=""
                className="backdrop__image"
                src={movie.backdrop_path ? `${tmdbBackdropPath + movie.backdrop_path}` : '/background.jpg'}
              />
            </div>
          )}
          <div className="view">
            <div className="back__button">
              {movie ? (
                <button className="button--back" onClick={history.goBack}>
                  Back
                </button>
              ) : (
                <Skeleton width={50} />
              )}
            </div>
            <div className="view__wrapper">
              <div className="view__poster">
                {movie?.id ? (
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
              <div className="view__details">
                <h1 className="view__title">
                  {movie ? (
                    <>
                      {movie.original_title || movie.original_name}
                      {movie.release_date && <span>{` (${getYear(movie.release_date)}) `}</span>}
                    </>
                  ) : (
                    <Skeleton width={250} />
                  )}
                </h1>
                <p className="view__rating mb-0">
                  {movie ? (
                    <>
                      <i className="fa fa-star" />
                      &nbsp;{movie.vote_average?.toFixed(1)} Rating
                    </>
                  ) : (
                    <Skeleton width={180} />
                  )}
                </p>
                {movie?.genres.length >= 1 && (
                  <i className="mt-0 text-subtle">
                    {movie.genres.map((genre, index) => (
                      <Link className="view__genre" key={`${movie.id}_genre${genre.id}`} to={`/genre/${genre.name}/${genre.id}`}>
                        {genre.name} {index < movie.genres.length - 1 && '/ '}
                      </Link>
                    ))}
                  </i>
                )}
                <h4 className="view__overview-title">{movie ? 'Overview' : <Skeleton width={150} />}</h4>
                <p className="view__overview">{movie ? movie.overview : <Skeleton count={4} />}</p>
                <div className="view__actions">
                  {movie && (
                    <>
                      <button className="button--primary" onClick={handleGiveReview}>
                        Give Review &nbsp;&nbsp;
                        <i className="fa fa-comment" />
                      </button>
                      &nbsp;
                      <button
                        className="button--favorites"
                        onClick={() => addToFavorites(movie)}
                        style={{
                          color: isFavorite(movie.id) ? '#fff' : getCSSVar('--text-color'),
                          background: isFavorite(movie.id) ? '#ff2e4f' : 'transparent',
                          border: isFavorite(movie.id) ? '1px solid #ff2e4f' : `1px solid ${getCSSVar('--text-color')}`
                        }}
                      >
                        {isFavorite(movie.id) ? 'Unfavorite' : 'Favorite'}
                        &nbsp;&nbsp;
                        <i
                          className="fa fa-heart"
                          style={{
                            color: isFavorite(movie.id) ? '#fff' : getCSSVar('--text-color')
                          }}
                        />
                      </button>
                      &nbsp;
                <button
                  className="button--watched"
                  onClick={() => handleAddToWatched(movie)}
                  style={{
                    color: isWatched(movie.id) ? '#fff' : getCSSVar('--text-color'),
                    background: isWatched(movie.id) ? '#4CAF50' : 'transparent',
                    border: isWatched(movie.id) ? '1px solid #4CAF50' : `1px solid ${getCSSVar('--text-color')}`
                  }}
                >
                  {isWatched(movie.id) ? 'Unwatch' : 'Already Watched'}
                  &nbsp;&nbsp;
                  <i
                    className="fa fa-eye"
                    style={{
                      color: isWatched(movie.id) ? '#fff' : getCSSVar('--text-color')
                    }}
                  />
                </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal for Review */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} center
        styles={{
          modal: {
            width: "500px",
            height: "300px",
            maxWidth: "90%",
            maxHeight: "90%",
            padding: "20px",
            background: "rgba(0,0,0)",
          },
          overlay: {
            background: "rgba(246, 243, 243, 0.3)",
            backdropFilter: "blur(4px)",
          },
        }}>
        <h2 className="text-xl font-bold">Rate & Review</h2>
        <div className="mt-6 flex justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>
        <textarea
          className="mt-4 w-full border rounded-lg p-2"
          style={{ height: "150px" }}
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleSubmitReview}>
            Submit
          </button>
        </div>
      </Modal> 
    </SkeletonTheme>
  );
};

export default MovieOverview;

