import * as action from '@app/constants/actionType';

export const setYearFilter = (year, target) => ({
  type: action.SET_YEAR_FILTER,
  payload: {
    year,
    target,
  },
});

export const setSortFilter = (sort, target) => ({
  type: action.SET_SORT_FILTER,
  payload: {
    sort,
    target,
  },
});

export const setGenreFilter = (genre, target) => ({
  type: action.SET_GENRE_FILTER,
  payload: {
    genre,
    target,
  },
});

export const updateQuery = (query, target) => ({
  type: action.UPDATE_QUERY,
  payload: {
    query,
    target,
  },
});
