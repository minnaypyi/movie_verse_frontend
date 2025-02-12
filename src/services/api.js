import axios from "axios";

const tmdb = "https://api.themoviedb.org/3";
const tmdbKey = import.meta.env.VITE_TMDB_KEY;
const tmdbBearerToken = import.meta.env.VITE_TMDB_TOKEN;

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

export const getMovieReviews = (mediaType, id) => {
  return httpRequest({
    url: `/${mediaType}/${id}/reviews`,
  });
};

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
