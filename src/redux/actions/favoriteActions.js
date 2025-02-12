import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from '@app/constants/actionType';

export const addToFavorites = (movie) => ({
  type: ADD_TO_FAVORITES,
  payload: movie,
});

export const removeFromFavorites = (id) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: id,
});
