import * as action from "@app/constants/actionType";

export const fetchTrendingMovies = (page = 1) => ({
  type: action.FETCH_TRENDING_MOVIES,
  payload: { page },
});

export const fetchDiscoverMovies = (page = 1) => ({
  type: action.FETCH_DISCOVER_MOVIES,
  payload: { page },
});

export const fetchTvShows = (page = 1) => ({
  type: action.FETCH_TV_SHOWS,
  payload: { page },
});

export const fetchPopularMovies = (page = 1) => ({
  type: action.FETCH_POPULAR_MOVIES,
  payload: { page },
});

export const fetchTopRatedMovies = (page = 1) => ({
  type: action.FETCH_TOPRATED_MOVIES,
  payload: { page },
});

export const fetchUpcomingMovies = (page = 1) => ({
  type: action.FETCH_UPCOMING_MOVIES,
  payload: { page },
});

export const fetchMainMovies = () => ({
  type: action.FETCH_MAIN_MOVIES,
});

export const fetchSelectedMovie = (mediaType, id) => ({
  type: action.FETCH_SELECTED_MOVIE,
  payload: {
    mediaType,
    id,
  },
});

export const fetchTrendingMoviesSuccess = (data) => ({
  type: action.FETCH_TRENDING_MOVIES_SUCCESS,
  payload: data,
});

export const fetchDiscoverMoviesSuccess = (data) => ({
  type: action.FETCH_DISCOVER_MOVIES_SUCCESS,
  payload: data,
});

export const fetchTVShowSuccess = (data) => ({
  type: action.FETCH_TV_SHOWS_SUCCESS,
  payload: data,
});

export const fetchSelectedMoviesSuccess = (data) => ({
  type: action.FETCH_SELECTED_MOVIE_SUCCESS,
  payload: data,
});

export const fetchPopularMoviesSuccess = (data) => ({
  type: action.FETCH_POPULAR_MOVIES_SUCCESS,
  payload: data,
});

export const fetchTopRatedMoviesSuccess = (data) => ({
  type: action.FETCH_TOPRATED_MOVIES_SUCCESS,
  payload: data,
});

export const fetchUpcomingMoviesSuccess = (data) => ({
  type: action.FETCH_UPCOMING_MOVIES_SUCCESS,
  payload: data,
});

export const fetchMainMoviesSuccess = (data) => ({
  type: action.FETCH_MAIN_MOVIES_SUCCESS,
  payload: data,
});

export const fetchRecommendedMovies = (page = 1) => ({
  type: action.FETCH_RECOMMENDED_MOVIES,
  payload: { page },
});

export const fetchRecommendedMoviesSuccess = (data) => ({
  type: action.FETCH_RECOMMENDED_MOVIES_SUCCESS,
  payload: data,
});

export const fetchWatchedMovies = (page = 1) => ({
  type: action.FETCH_WATCHED_MOVIES,
  payload: { page },
});
