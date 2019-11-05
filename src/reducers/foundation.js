import {
  FOUNDATION_PAGE_UNLOADED,
  FOUNDATION_PAGE_LOADED,
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
    default:
      return state;
  }
};
