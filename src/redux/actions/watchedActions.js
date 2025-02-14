import * as action from "@app/constants/actionType";

export const addToWatched = (movie) => ({
  type: "ADD_TO_WATCHED",
  payload: movie,
});

export const removeFromWatched = (movie) => ({
  type: "REMOVE_FROM_WATCHED",
  payload: movie,
});

//new
export const setWatchedMovies = (movieIds) => ({
  type: "SET_WATCHED_MOVIES",
  payload: movieIds,
});
