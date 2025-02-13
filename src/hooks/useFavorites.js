import {
  addToFavorites as addFavorites,
  removeFromFavorites,
} from "@app/redux/actions/favoriteActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const useFavorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const isFavorite = (movieId) => favorites.some((item) => item.id === movieId);

  const addToFavorites = async (movie) => {
    if (!movie) return;
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      alert("You must be logged in to add a movie to favorites.");
      return;
    }

    try {
      // Make API call to toggle favorite status on the backend
      await axios.post(
        `http://${VITE_BACKEND_URL}/api/user-interactions/favorite/${movie.id}`, // Use correct movie ID
        {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (!isFavorite(movie.id)) {
        // Add to favorites in Redux if not already in favorites
        dispatch(addFavorites(movie));
        toast.dismiss();
        toast.dark(
          `${movie.original_name || movie.original_title} \n Added to favorites`
        );
      } else {
        // Remove from favorites in Redux if already in favorites
        dispatch(removeFromFavorites(movie.id));
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
      console.error("Error toggling favorite:", error);
      toast.dismiss();
      toast.error("Failed to update favorite status.");
    }
  };
  //   if (!isFavorite(movie.id)) {
  //     dispatch(addFavorites(movie));
  //     toast.dismiss();
  //     toast.dark(`${movie.original_name || movie.original_title} \n Added to favorites`);
  //   } else {
  //     dispatch(removeFromFavorites(movie.id));
  //     toast.dismiss();
  //     toast.dark(`${movie.original_name || movie.original_title} \n Removed from favorites`, {
  //       autoClose: 5000,
  //       progressStyle: { backgroundColor: '#DC143C' }
  //     });
  //   }
  // };

  return { favorites, isFavorite, addToFavorites };
};

export default useFavorites;
