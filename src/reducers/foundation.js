import {
  FOUNDATION_PAGE_UNLOADED,
  FOUNDATION_PAGE_LOADED,
  NEW_FOUNDATION,
  ASYNC_START,
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
      };
    default:
      return state;
  }
};
