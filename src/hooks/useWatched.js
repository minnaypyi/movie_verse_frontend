import {
  addToWatched as addToWatchedAction, // Rename action import for clarity
  removeFromWatched,
} from "@app/redux/actions/watchedActions"; // Add watched actions
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useWatched = () => {
  const watchedMovies = useSelector((state) => state.watchedMovies || []); // State for watched
  const dispatch = useDispatch();

  const isWatched = (movieId) =>
    watchedMovies.some((item) => item.id === movieId);

  const handleAddToWatched = (movie) => {
    if (!movie) return;

    if (!isWatched(movie.id)) {
      dispatch(addToWatchedAction(movie)); // Add to watched
      toast.dismiss();
      toast.dark(
        `${movie.original_name || movie.original_title} \n Added to watched`
      );
    } else {
      dispatch(removeFromWatched(movie.id)); // Remove from watched
      toast.dismiss();
      toast.dark(
        `${
          movie.original_name || movie.original_title
        } \n Removed from watched`,
        {
          autoClose: 5000,
          progressStyle: { backgroundColor: "#4CAF50" },
        }
      );
    }
  };

  return { watchedMovies, isWatched, handleAddToWatched };
};

export default useWatched;
