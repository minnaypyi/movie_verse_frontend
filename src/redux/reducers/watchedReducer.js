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
    //new
    case "SET_WATCHED_MOVIES":
      return {
        ...state,
        watchedMovies: action.payload, // Replace state with fetched movies
      };
    default:
      return state;
  }
};

export default watchedMoviesReducer;
