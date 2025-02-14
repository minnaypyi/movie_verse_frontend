// import {
//   addToFavorites as addFavorites,
//   removeFromFavorites,
// } from "@app/redux/actions/favoriteActions";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import axios from "axios";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;
// const useFavorites = () => {
//   const favorites = useSelector((state) => state.favorites);
//   const dispatch = useDispatch();

//   const isFavorite = (movieId) => favorites.some((item) => item.id === movieId);

//   const addToFavorites = async (movie) => {
//     if (!movie) return;
//     const storedToken = localStorage.getItem("authToken");
//     if (!storedToken) {
//       //alert("You must be logged in to add a movie to favorites.");
//       toast.dismiss();
//       toast.error("Please log in");
//       return;
//     }

//     try {
//       // Make API call to toggle favorite status on the backend
//       await axios.post(
//         `http://${backendUrl}:8080/api/user-interactions/favorite/${movie.id}`, // Use correct movie ID
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${storedToken}`,
//           },
//         }
//       );

//       if (!isFavorite(movie.id)) {
//         // Add to favorites in Redux if not already in favorites
//         dispatch(addFavorites(movie));
//         toast.dismiss();
//         toast.dark(
//           `${movie.original_name || movie.original_title} \n Added to favorites`
//         );
//       } else {
//         // Remove from favorites in Redux if already in favorites
//         dispatch(removeFromFavorites(movie.id));
//         toast.dismiss();
//         toast.dark(
//           `${
//             movie.original_name || movie.original_title
//           } \n Removed from favorites`,
//           {
//             autoClose: 5000,
//             progressStyle: { backgroundColor: "#DC143C" },
//           }
//         );
//       }
//     } catch (error) {
//       console.error("Error toggling favorite:", error);
//       toast.dismiss();
//       toast.error("Failed to update favorite status.");
//     }
//   };
//   //   if (!isFavorite(movie.id)) {
//   //     dispatch(addFavorites(movie));
//   //     toast.dismiss();
//   //     toast.dark(`${movie.original_name || movie.original_title} \n Added to favorites`);
//   //   } else {
//   //     dispatch(removeFromFavorites(movie.id));
//   //     toast.dismiss();
//   //     toast.dark(`${movie.original_name || movie.original_title} \n Removed from favorites`, {
//   //       autoClose: 5000,
//   //       progressStyle: { backgroundColor: '#DC143C' }
//   //     });
//   //   }
//   // };

//   return { favorites, isFavorite, addToFavorites };
// };

// export default useFavorites;
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useFavorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Check if the movie is in the favorites list
  const isFavorite = (movieId) => favoriteMovies.includes(movieId);

  // Fetch favorite movies from the backend
  const fetchFavoriteMovies = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await axios.get(
        `http://${backendUrl}:8080/api/user-interactions/favorites`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFavoriteMovies(response.data);
    } catch (error) {
      console.error("Error fetching favorite movies", error);
    }
  };

  // Load favorite movies when the component mounts
  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  // Add or remove a movie from favorites
  const addToFavorites = async (movie) => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      toast.dismiss();
      toast.error("Please log in");
      return;
    }

    try {
      const isCurrentlyFavorite = isFavorite(movie.id);

      // Make the API call to add or remove the movie from favorites
      const method = isCurrentlyFavorite ? "DELETE" : "POST";
      await axios.post(
        `http://${backendUrl}:8080/api/user-interactions/favorite/${movie.id}`, // Use correct movie ID
        {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      // Update the state after adding/removing a movie
      if (isCurrentlyFavorite) {
        setFavoriteMovies(favoriteMovies.filter((id) => id !== movie.id));
      } else {
        setFavoriteMovies([...favoriteMovies, movie.id]);
      }
      if (!isFavorite(movie.id)) {
        toast.dismiss();
        toast.dark(
          `${movie.original_name || movie.original_title} \n Added to favorites`
        );
      } else {
        toast.dismiss();
        toast.dark(
          `${
            movie.original_name || movie.original_title
          } \n Removed from favorites`,
          {
            autoClose: 5000,
            progressStyle: { backgroundColor: "#DC143C" },
          }
        );
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
      toast.dismiss();
      toast.error("Failed to update favorite status.");
    }
  };

  return { favoriteMovies, isFavorite, addToFavorites };
};

export default useFavorite;
