import { DASHBOARD_PAGE_LOADED, DASHBOARD_PAGE_UNLOADED, DASHBOARD_FOUNDATIONS_LOADED } from 'constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_PAGE_LOADED:
      return {
        ...state,
        foundations: action.payload.foundations,
      };
    case DASHBOARD_PAGE_UNLOADED:
      return {};
    case DASHBOARD_FOUNDATIONS_LOADED:
      return {
        ...state,
        grantsForFoundation: {
          ...state.grantsForFoundation,
          // this is a hack lol
          [action.payload.grants[0].foundation.name]: action.payload.grants,
        },
      };
    default:
      return state;
  }
};
