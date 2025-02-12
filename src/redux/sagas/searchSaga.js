import { search } from "@app/services/api";
import {
  SEARCH,
  SEARCH_MOVIES,
  SEARCH_PEOPLE,
  //SEARCH_TV_SHOWS,
} from "@app/constants/actionType";
import { all, call, put } from "redux-saga/effects";
import { setLoading } from "../actions/miscActions";
import {
  searchMoviesSuccess,
  searchPeopleSuccess,
  searchSuccess,
  //searchTvShowsSuccess,
} from "../actions/searchActions";

export function* searchSaga({ type, payload }) {
  switch (type) {
    case SEARCH: {
      try {
        yield put(setLoading(true));
        const { query } = payload;
        const [movies, people] = yield all([
          //tv,
          //call(search, 'tv', query),
          call(search, "movie", query),
          call(search, "person", query),
        ]);

        yield put(searchSuccess({ movies, people })); //tv,
      } catch (err) {
        console.error("Error searching:", err);
      } finally {
        yield put(setLoading(false));
      }
      break;
    }
    case SEARCH_MOVIES: {
      try {
        yield put(setLoading(true));
        const { query, page } = payload;
        const movies = yield call(search, "movie", query, page);
        yield put(searchMoviesSuccess(movies));
      } catch (err) {
        console.error("Error searching movies:", err);
      } finally {
        yield put(setLoading(false));
      }
      break;
    }
    // case SEARCH_TV_SHOWS: {
    //   try {
    //     yield put(setLoading(true));
    //     const { query, page } = payload;
    //     const tvShows = yield call(search, "tv", query, page);
    //     yield put(searchTvShowsSuccess(tvShows));
    //   } catch (err) {
    //     console.error("Error searching TV shows:", err);
    //   } finally {
    //     yield put(setLoading(false));
    //   }
    //   break;
    // }
    case SEARCH_PEOPLE: {
      try {
        yield put(setLoading(true));
        const { query, page } = payload;
        const people = yield call(search, "person", query, page);
        yield put(searchPeopleSuccess(people));
      } catch (err) {
        console.error("Error searching people:", err);
      } finally {
        yield put(setLoading(false));
      }
      break;
    }
    default:
      throw new Error("Unexpected action type");
  }
}
