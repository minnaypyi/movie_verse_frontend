// src/hooks/useLogMovieView.js
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const useLogMovieView = () => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");

  const logMovieView = async (tmdb_movie_id) => {
    if (!token) {
      //toast.error("Please log in to view movie details");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `http://${backendUrl}:8080/api/user-interactions/view/${tmdb_movie_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //toast.success(response.data); // Show success message from backend
    } catch (error) {
      console.error("Error logging movie view:", error);
      toast.error("Failed to log movie view");
    } finally {
      setLoading(false);
    }
  };

  return {
    logMovieView,
    loading,
  };
};

export default useLogMovieView;
