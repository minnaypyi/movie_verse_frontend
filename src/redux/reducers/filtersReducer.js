import { SET_YEAR_FILTER, SET_GENRE_FILTER, SET_SORT_FILTER, UPDATE_QUERY } from '@app/constants/actionType';

const defaultFilterProp = {
  genre: '',
  sort: '',
  year: '',
  query: ''
};

export default (
  state = {
    tv: { ...defaultFilterProp },
    discover: { ...defaultFilterProp },
  },
  action
) => {
  switch (action.type) {
    case SET_YEAR_FILTER:
      return {
        ...state,
        [action.payload.target]: {
          ...state[action.payload.target],
          year: action.payload.year,
        },
      };
    case SET_GENRE_FILTER:
      return {
        ...state,
        [action.payload.target]: {
          ...state[action.payload.target],
          genre: action.payload.genre,
        },
      };
    case SET_SORT_FILTER:
      return {
        ...state,
        [action.payload.target]: {
          ...state[action.payload.target],
          sort: action.payload.sort,
        },
      };
    case UPDATE_QUERY:
      return {
        ...state,
        [action.payload.target]: {
          ...state[action.payload.target],
          query: action.payload.query,
        },
      };
    default:
      return state;
  }
};
