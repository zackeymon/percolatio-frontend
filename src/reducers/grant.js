import {
  GRANT_PAGE_LOADED,
  GRANT_PAGE_UNLOADED,
  GRANT_CREATION_REQUEST,
  GRANT_CREATION_SUCCESS,
  GRANT_CREATION_ERROR,
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
    case GRANT_CREATION_REQUEST:
      return { ...state, isSubmittingForm: true };
    case GRANT_CREATION_SUCCESS:
    case GRANT_CREATION_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
      };
    default:
      return state;
  }
};
