import { IS_LOADING, SET_DARK_MODE } from '@app/constants/actionType';

const defaultState = {
  isLoading: false,
  darkMode: true,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_DARK_MODE:
      return {
        ...state,
        darkMode: action.payload,
      };
    default:
      return state;
  }
};
