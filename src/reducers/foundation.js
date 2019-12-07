import {
  FOUNDATION_PAGE_UNLOADED,
  FOUNDATION_PAGE_LOADED,
  FOUNDATION_CREATION_REQUEST,
  FOUNDATION_CREATION_SUCCESS,
  FOUNDATION_CREATION_ERROR,
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
    case FOUNDATION_CREATION_REQUEST:
      return { ...state, isSubmittingForm: true };
    case FOUNDATION_CREATION_SUCCESS:
    case FOUNDATION_CREATION_ERROR:
      return {
        ...state,
        isSubmittingForm: false,
      };
    default:
      return state;
  }
};
