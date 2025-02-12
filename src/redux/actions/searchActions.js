import * as action from '@app/constants/actionType';

export const search = (query) => ({
  type: action.SEARCH,
  payload: { query },
});

export const searchTvShows = (query, page = 1) => ({
  type: action.SEARCH_TV_SHOWS,
  payload: { query, page },
});

export const searchPeople = (query, page = 1) => ({
  type: action.SEARCH_PEOPLE,
  payload: { query, page },
});

export const searchMovies = (query, page = 1) => ({
  type: action.SEARCH_MOVIES,
  payload: { query, page },
});

export const updateSearchQuery = (query) => ({
  type: action.UPDATE_SEARCH_QUERY,
  payload: { query },
});

export const addSearchHistory = (search) => ({
  type: action.ADD_SEARCH_HISTORY,
  payload: search,
});

export const clearSearchHistory = () => ({
  type: action.CLEAR_SEARCH_HISTORY,
});

export const searchSuccess = (data) => ({
  type: action.SEARCH_SUCCESS,
  payload: data,
});

export const searchMoviesSuccess = (data) => ({
  type: action.SEARCH_MOVIES_SUCCESS,
  payload: data,
});

export const searchTvShowsSuccess = (data) => ({
  type: action.SEARCH_TV_SHOWS_SUCCESS,
  payload: data,
});

export const searchPeopleSuccess = (data) => ({
  type: action.SEARCH_PEOPLE_SUCCESS,
  payload: data,
});
