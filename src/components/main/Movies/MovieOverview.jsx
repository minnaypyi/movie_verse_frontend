// import ImageLoader from '@app/components/common/Loader/ImageLoader';
// import { getCSSVar, getYear } from '@app/helpers/helperFunctions';
// import useFavorites from '@app/hooks/useFavorites';
// import React, { useState, useEffect  } from 'react';
// import LazyLoad from 'react-lazy-load';
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// import { useSelector } from 'react-redux';
// import Modal from 'react-responsive-modal';
// import "react-responsive-modal/styles.css";
// import { Link, useHistory } from 'react-router-dom';
// import { Star } from "lucide-react";
// import axios from 'axios';

// const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
// const tmdbBackdropPath = 'https://image.tmdb.org/t/p/original';

// const MovieOverview = () => {
//   const movie = useSelector((state) => state.movies.current.movie);
//   const history = useHistory();
//   const { isFavorite, addToFavorites } = useFavorites();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState("");
//   // 🔥 Fetch user authentication details
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [isEdit, setIsEdit] = useState(false);
//   const [tmdbmovie, settmdbmovie] = useState(null);
//   useEffect(() => {
//     const storedToken = localStorage.getItem('authToken');
//     const storedUser = localStorage.getItem('username'); 

//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(storedUser);
//     }
//   }, []);

//   const handleRating = (star) => setRating(star);
//   const handleSubmitReview = async () => {
//     if (!user || !token) {
//       alert("You must be logged in to submit a review.");
//       return;
//     }
//     try {
//       // Submit review
//       await axios.post(`/api/reviews/${tmdbmovie.tmdbId}`, 
//       //   new URLSearchParams({
//       //   reviewText: review,
//       //   isEdit: isEdit // Pass true if editing an existing review, false otherwise
//       // }), 
//       { reviewText: review, isEdit: isEdit },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include token in the request
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     // Submit rating
//     await axios.post(`/api/ratings/${tmdbmovie.tmdbId}`, 
//       // new URLSearchParams({
//       //   rating: rating
//       // }), 
//       { rating: rating},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//       console.log("Review & Rating submitted!");
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error submitting review/rating:", error);
//       alert("Failed to submit review and rating.");
//     }
//     // console.log("Review Submitted:", { rating, review });
//     // setIsModalOpen(false);
//   };
//   console.log(`"tmdb id" ${tmdbmovie}`);
//   return (
//     <SkeletonTheme
//       color={getCSSVar('--skeleton-theme-color')}
//       highlightColor={getCSSVar('--skeleton-theme-highlight')}
//     >
//       <div className="movie__overview">
//         <div className="container__wrapper movie__overview-wrapper">
//           {movie?.id && (
//             <div className="backdrop__container">
//               <img
//                 alt=""
//                 className="backdrop__image"
//                 src={movie.backdrop_path ? `${tmdbBackdropPath + movie.backdrop_path}` : '/background.jpg'}
//               />
//             </div>
//           )}
//           <div className="view">
//             <div className="back__button">
//               {movie ? (
//                 <button className="button--back" onClick={history.goBack}>
//                   Back
//                 </button>
//               ) : (
//                 <Skeleton width={50} />
//               )}
//             </div>
//             <div className="view__wrapper">
//               <div className="view__poster">
//                 {movie?.id ? (
//                   <LazyLoad debounce={false} offsetVertical={500}>
//                     <ImageLoader
//                       alt={movie.original_title || movie.original_name || movie.title}
//                       imgId={movie.id}
//                       src={movie.poster_path ? `${tmdbPosterPath + movie.poster_path}` : '/img-placeholder.jpg'}
//                     />
//                   </LazyLoad>
//                 ) : (
//                   <Skeleton width={'100%'} height={'100%'} />
//                 )}
//               </div>
//               <div className="view__details">
//                 <h1 className="view__title">
//                   {movie ? (
//                     <>
//                       {movie.original_title || movie.original_name}
//                       {movie.release_date && <span>{` (${getYear(movie.release_date)}) `}</span>}
//                     </>
//                   ) : (
//                     <Skeleton width={250} />
//                   )}
//                 </h1>
//                 <p className="view__rating mb-0">
//                   {movie ? (
//                     <>
//                       <i className="fa fa-star" />
//                       &nbsp;{movie.vote_average?.toFixed(1)} Rating
//                     </>
//                   ) : (
//                     <Skeleton width={180} />
//                   )}
//                 </p>
//                 {movie?.genres.length >= 1 && (
//                   <i className="mt-0 text-subtle">
//                     {movie.genres.map((genre, index) => (
//                       <Link className="view__genre" key={`${movie.id}_genre${genre.id}`} to={`/genre/${genre.name}/${genre.id}`}>
//                         {genre.name} {index < movie.genres.length - 1 && '/ '}
//                       </Link>
//                     ))}
//                   </i>
//                 )}
//                 <h4 className="view__overview-title">{movie ? 'Overview' : <Skeleton width={150} />}</h4>
//                 <p className="view__overview">{movie ? movie.overview : <Skeleton count={4} />}</p>
//                 <div className="view__actions">
//                   {movie && (
//                     <>
//                        <button className="button--primary" onClick={() => {settmdbmovie(movie);setIsModalOpen(true);}}> 
//                         Give Review &nbsp;&nbsp;
//                         <i className="fa fa-comment" />
//                       </button>
//                       &nbsp;
//                       <button
//                         className="button--favorites"
//                         onClick={() => addToFavorites(movie)}
//                         style={{
//                           color: isFavorite(movie.id) ? '#fff' : getCSSVar('--text-color'),
//                           background: isFavorite(movie.id) ? '#ff2e4f' : 'transparent',
//                           border: isFavorite(movie.id) ? '1px solid #ff2e4f' : `1px solid ${getCSSVar('--text-color')}`
//                         }}
//                       >
//                         {isFavorite(movie.id) ? 'Unfavorite' : 'Favorite'}
//                         &nbsp;&nbsp;
//                         <i
//                           className="fa fa-heart"
//                           style={{
//                             color: isFavorite(movie.id) ? '#fff' : getCSSVar('--text-color')
//                           }}
//                         />
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Modal for Review */}
//        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} center
//         styles={{
//           modal: {
//             width: "500px", // Adjust width
//             height: "300px",
//             maxWidth: "90%", // Prevent too wide on small screens
//             maxHeight: "90%",
//             padding: "20px", // Add padding
//             background: "rgba(0,0,0)",
//           },
//           overlay: {
//             background: "rgba(246, 243, 243, 0.3)", // Darker background
//             backdropFilter: "blur(4px)", // Blur effect
//           },
//         }}>
//         <h2 className="text-xl font-bold">Rate & Review</h2>
//         <div className="mt-6 flex justify-center">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <Star
//               key={star}
//               className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
//               onClick={() => handleRating(star)}
//             />
//           ))}
//         </div>
//         <textarea
//           className="mt-4 w-full border rounded-lg p-2"
//           style={{ height: "150px" }} // Adjust height as needed
//           placeholder="Write your review..."
//           value={review}
//           onChange={(e) => setReview(e.target.value)}
//         />
//         <div className="mt-4 flex justify-end space-x-2">
//           <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={() => setIsModalOpen(false)}>
//             Cancel
//           </button>
//           <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleSubmitReview}>
//             Submit
//           </button>
//         </div>
//       </Modal> 
//     </SkeletonTheme>
//   );
// };

// export default MovieOverview;

import ImageLoader from '@app/components/common/Loader/ImageLoader';
import { getCSSVar, getYear } from '@app/helpers/helperFunctions';
import useFavorites from '@app/hooks/useFavorites';
import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazy-load';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import Modal from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import { Link, useHistory, useParams } from 'react-router-dom';
import { Star } from "lucide-react";
import axios from 'axios';

const tmdbPosterPath = 'https://image.tmdb.org/t/p/w300_and_h450_face/';
const tmdbBackdropPath = 'https://image.tmdb.org/t/p/original';

const MovieOverview = () => {
  const movie = useSelector((state) => state.movies.current.movie);
  const history = useHistory();
  const { isFavorite, addToFavorites } = useFavorites();
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

  const handleRating = (star) => setRating(star);

  const handleSubmitReview = async () => {
    if (!user || !token) {
      alert("You must be logged in to submit a review.");
      return;
    }

    try {
      // Submit review
      // await axios.post(`http://localhost:8080/api/reviews/${tmdbMovie.id}`, { reviewText: review, isEdit: isEdit }, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      // });
      await axios.post(
        `http://localhost:8080/api/reviews/${tmdbMovie.id}?reviewText=${encodeURIComponent(review)}&isEdit=${isEdit}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Submit rating
      // await axios.post(`http://localhost:8080/api/ratings/${tmdbMovie.id}`, { rating: rating }, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      // });
      await axios.post(
        `http://localhost:8080/api/ratings/${tmdbMovie.id}?rating=${rating}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      

      console.log("Review & Rating submitted!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting review/rating:", error);
      alert("Failed to submit review and rating.");
    }
  };

  console.log('tmdbmovie:', movie);

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
                      <button className="button--primary" onClick={() => { setTmdbMovie(movie); setIsModalOpen(true); }}>
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

