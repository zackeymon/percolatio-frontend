import {
  FOUNDATION_PAGE_UNLOADED,
  FOUNDATION_PAGE_LOADED,
<<<<<<< HEAD
  NEW_FOUNDATION,
  ASYNC_START,
=======
  FOUNDATION_CREATION_REQUEST,
  FOUNDATION_CREATION_SUCCESS,
  FOUNDATION_CREATION_ERROR,
>>>>>>> master
} from 'constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case FOUNDATION_PAGE_LOADED:
      return {
        ...state,
        foundation: action.payload[0].foundation,
      };
    case FOUNDATION_PAGE_UNLOADED:
      return {};
<<<<<<< HEAD
    case ASYNC_START:
      if (action.subtype === NEW_FOUNDATION) {
        return { ...state, isSubmittingForm: true };
      }
      return state;
    case NEW_FOUNDATION:
      return {
        ...state,
        isSubmittingForm: false,
        errors: action.error ? action.payload.errors : null,
=======
    case FOUNDATION_CREATION_REQUEST:
      return { ...state, isSubmittingForm: true };
    case FOUNDATION_CREATION_SUCCESS:
    case FOUNDATION_CREATION_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
>>>>>>> master
      };
    default:
      return state;
  }
};
