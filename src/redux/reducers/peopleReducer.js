import { FETCH_PEOPLE_SUCCESS, FETCH_SELECTED_PERSON_SUCCESS } from '@app/constants/actionType';

const defaultState = {
  people: null,
  current: {
    actor: null,
    casting: [],
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_PEOPLE_SUCCESS:
      return {
        ...state,
        people: action.payload,
      };
    case FETCH_SELECTED_PERSON_SUCCESS:
      return {
        ...state,
        current: {
          actor: action.payload.actor,
          casting: action.payload.casting,
        },
      };
    default:
      return state;
  }
};
