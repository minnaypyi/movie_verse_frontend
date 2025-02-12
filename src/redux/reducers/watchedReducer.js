const initialState = {
  watchedMovies: [],
  // other states
};

const watchedMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_WATCHED":
      return {
        ...state,
        watchedMovies: [...state.watchedMovies, action.payload],
      };
    case "REMOVE_WATCHED":
      return {
        ...state,
        watchedMovies: state.watchedMovies.filter(
          (movie) => movie.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default watchedMoviesReducer;
