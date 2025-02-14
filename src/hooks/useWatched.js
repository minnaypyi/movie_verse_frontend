import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useWatched = () => {
  const [watchedMovies, setWatchedMovies] = useState([]);

  // Check if the movie is in the watched list
  const isWatched = (movieId) => watchedMovies.includes(movieId);

  // Add or remove movie from the watched list
  const handleAddToWatched = async (movie) => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      //alert("You must be logged in to add a movie to favorites.");
      toast.dismiss();
      toast.error("Please log in");
      return;
    }
    try {
      const token = localStorage.getItem("authToken"); // Get token from localStorage
      if (isWatched(movie.id)) {
        // Remove from watched list
        setWatchedMovies(watchedMovies.filter((id) => id !== movie.id));

        // Optionally, make an API call to remove from the backend
        await axios.put(
          `http://${backendUrl}:8080/api/user-interactions/unwatched/${movie.id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.dismiss();
        toast.dark(
          `${
            movie.original_name || movie.original_title
          } \n Removed from watched`,
          {
            autoClose: 5000,
            progressStyle: { backgroundColor: "#DC143C" },
          }
        );
      } else {
        // Add to watched list
        setWatchedMovies([...watchedMovies, movie.id]);

        // Optionally, make an API call to add to the backend
        await axios.put(
          `http://${backendUrl}:8080/api/user-interactions/watched/${movie.id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.dismiss();
        toast.dark(
          `${movie.original_name || movie.original_title} \n Added to watched`
        );
      }
    } catch (error) {
      console.error("Error updating watched status", error);
      toast.dismiss();
      toast.error("Failed to update watch status.");
    }
  };

  // Optionally, load the watched movies from the backend (for persistence)
  useEffect(() => {
    console.log("Fetching watched movies from backend...");
    const token = localStorage.getItem("authToken");
    const fetchWatchedMovies = async () => {
      try {
        const response = await axios.get(
          `http://${backendUrl}:8080/api/user-interactions/watched`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        //console.log("API Response:", response.data); // Debugging
        setWatchedMovies(response.data);
      } catch (error) {
        console.error("Error fetching watched movies", error);
      }
    };

    fetchWatchedMovies();
  }, []);

  return { watchedMovies, isWatched, handleAddToWatched };
};

export default useWatched;
