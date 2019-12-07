import {
  GRANT_PAGE_LOADED,
  GRANT_PAGE_UNLOADED,
  ASYNC_START,
  NEW_GRANT,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GRANT_PAGE_LOADED:
      return {
        ...state,
        grant: action.payload[0].grant,
      };
    case GRANT_PAGE_UNLOADED:
      return {};
    case ASYNC_START:
      if (action.subtype === NEW_GRANT) {
        return { ...state, isSubmittingForm: true };
      }
      return state;
    case NEW_GRANT:
      return {
        ...state,
        isSubmittingForm: false,
        errors: action.error ? action.payload.errors : null,
      };
    default:
      return state;
  }
};
