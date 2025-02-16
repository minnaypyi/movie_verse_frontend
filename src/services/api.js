import axios from "axios";

const tmdb = "https://api.themoviedb.org/3";
const tmdbKey = import.meta.env.VITE_TMDB_KEY;
const tmdbBearerToken = import.meta.env.VITE_TMDB_TOKEN;
const backendurl = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem("authToken");

const axiosClient = axios.create({ baseURL: tmdb });

axiosClient.interceptors.request.use((config) => {
  config.baseURL = tmdb;
  config.method = "GET";
  config.params = config.params || {};
  config.params["api_key"] = tmdbKey;

  return config;
});

const httpRequest = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const request = await axiosClient(req);
      resolve(request.data);
    } catch (e) {
      reject(e?.response?.data || { status_code: 500 });
    }
  });
};

export const getGenres = () => httpRequest({ url: "/genre/movie/list" });

export const getSelectedGenre = (genreId, page = 1) => {
  return httpRequest({
    //url: `/discover/movie?&with_genres=${genreId}&page=${page}`,
    url: `/discover/movie?&with_genres=${genreId}&page=${page}`,
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbBearerToken}`, // Use Bearer token for search requests
    },
  });
};

export const getTrendingMovies = (page = 1) => {
  return httpRequest({
    url: `/trending/all/day?page=${page}`,
  });
};

export const getDiscoverMovies = (filter, page = 1) => {
  return httpRequest({
    url: `/discover/movie`,
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbBearerToken}`, // Use Bearer token for search requests
    },
    params: {
      page,
      with_genres: filter.genre,
      year: filter.year,
      first_air_date_year: filter.year,
      sort_by: filter.sort,
    },
  });
};

export const getUpcomingMovies = (page = 1) => {
  return httpRequest({
    url: `/movie/upcoming?page=${page}`,
  });
};

export const getPopularMovies = (page = 1) => {
  return httpRequest({
    url: `/movie/popular?page=${page}`,
  });
};

export const getTopRatedMovies = (page = 1) => {
  return httpRequest({
    url: `/movie/top_rated?page=${page}`,
  });
};

export const getTvShows = (filter, page = 1) => {
  return httpRequest({
    url: `/discover/tv`,
    params: {
      page,
      language: "en-US",
      with_genres: filter.genre,
      year: filter.year,
      first_air_date_year: filter.year,
      sort_by: filter.sort,
    },
  });
};

export const getSelectedMovie = (mediaType, id) => {
  return httpRequest({
    url: `/${mediaType}/${id}`,
    params: {
      append_to_response: "similar,videos,images",
    },
  });
};

export const getMovieCredits = (mediaType, id) => {
  return httpRequest({
    url: `/${mediaType}/${id}/credits`,
  });
};

export const getMovieKeywords = (mediaType, id) => {
  return httpRequest({
    url: `/${mediaType}/${id}/keywords`,
  });
};

const checkReviewsInDatabase = (movieId) => {
  return axios.get(`http://${backendurl}:8080/api/reviews/${movieId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
};

const mapBackendReviewsToTmdbFormat = (reviews) => {
  if (!Array.isArray(reviews)) {
    console.error("Expected an array of reviews but got:", reviews);
    return { results: [], page: 1, total_pages: 1, total_results: 0 }; // return an empty response
  }
  return {
    results: reviews.map((review) => {
      return {
        id: review.createdAt, // You can use createdAt or another unique identifier
        author: review.user.username, // Author's username
        author_details: {
          name: review.user.username, // Author's name
          username: review.user.username, // Username
          avatar_path: review.user.avatar || null, // Avatar path (null if not available)
          rating: review.reviewSentiment || null, // Rating (based on reviewSentiment)
        },
        content: review.originalReviewText, // Review text
        created_at: review.createdAt, // Review creation timestamp
        updated_at: review.updatedAt, // Review last updated timestamp
        url: `https://yourwebsite.com/review/${review.createdAt}`, // Placeholder URL for now
        reviewSentiment: review.reviewSentiment
      };
    }),
    page: 1, // You can add pagination if necessary
    total_pages: 1, // Total number of pages
    total_results: reviews.length, // Total number of reviews
  };
};

export const getMovieReviews = async (mediaType, id) => {
  try {
    // First, check if the reviews exist in your database
    const databaseReviewsResponse = await checkReviewsInDatabase(id);
    console.log(databaseReviewsResponse);
    const tmdbFormattedReviews = mapBackendReviewsToTmdbFormat(
      databaseReviewsResponse.data
    );
    console.log(tmdbFormattedReviews);
    if (
      tmdbFormattedReviews.results &&
      tmdbFormattedReviews.results.length > 0
    ) {
      // If reviews exist in your database, return them
      return tmdbFormattedReviews;
    } else {
      // If no reviews in the database, fetch from TMDB
      return httpRequest({
        url: `/${mediaType}/${id}/reviews`,
      });
      //return tmdbReviewsResponse.data.results;
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    // Handle error gracefully, maybe return empty array or fallback data
    return [];
  }
};

// export const getMovieReviews = (mediaType, id) => {
//   return httpRequest({
//     url: `/${mediaType}/${id}/reviews`,
//   });
// };

export const search = (category, query, page = 1) => {
  console.log("Searching:", { category, query, page }); // 🔥 Check the params before sending
  return httpRequest({
    //url: `/search/${category}`,
    url: `/search/${category}`,
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbBearerToken}`, // Use Bearer token for search requests
    },
    params: {
      query: query,
      page: page,
      include_adult: false,
      language: "en-US",
    },
    //params: { query, page }
  })
    .then((res) => {
      console.log("Search Response:", res); // 🔥 Log the response
      return res;
    })
    .catch((err) => {
      console.error("Search Error:", err); // 🔥 Log any errors
    });
};

export const getPeople = (page = 1) => {
  return httpRequest({
    url: "/person/popular",
    params: { page },
  });
};

export const getSelectedPerson = async (id) => {
  return httpRequest({
    url: `/person/${id}`,
    params: { append_to_response: "images" },
  });
};

export const getSelectedPersonCasting = async (id) => {
  return httpRequest({
    url: `/person/${id}/combined_credits`,
  });
};

export const getRecommendedMovies = async () => {
  try {
    // Fetch recommended movie IDs from your backend
    console.log("Requesting:");
    const response = await axios.get(
      `http://${backendurl}:8080/api/user-interactions/recommend`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          //"Content-Type": "application/json",
        },
      }
    );
    console.log("Response Data:", response.data);
    const movieIds = response.data;
    console.log(movieIds);
    if (!Array.isArray(movieIds)) {
      console.error("Invalid response format, expected an array:", movieIds);
      return [];
    }

    // Fetch movie details from TMDB for each movie ID
    const movieDetailsPromises = movieIds.map(
      (id) =>
        axios
          .get(`https://api.themoviedb.org/3/movie/${id}`, {
            headers: {
              Authorization: `Bearer ${tmdbBearerToken}`,
            },
          })
          .then((res) => res.data) // Extract data directly
    );

    // Wait for all requests to complete
    const movieDetails = await Promise.all(movieDetailsPromises);

    console.log("Fetched Movie Details:", movieDetails);
    return {
      page: 1, // Assuming only one page
      results: movieDetails, // Movie details array
      total_pages: 1,
      total_results: movieDetails.length,
    };
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    return [];
  }
};
