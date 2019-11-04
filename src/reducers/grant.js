import {
  GRANT_PAGE_LOADED,
  GRANT_PAGE_UNLOADED,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case GRANT_PAGE_LOADED:
      return {
        ...state,
        grant: action.payload.grant,
      };
    case GRANT_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
