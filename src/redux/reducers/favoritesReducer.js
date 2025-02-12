import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '@app/constants/actionType';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return [action.payload, ...state];
    case REMOVE_FROM_FAVORITES:
      return state.filter((favorite) => favorite.id !== action.payload);
    default:
      return state;
  }
};
