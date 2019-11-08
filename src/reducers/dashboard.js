import { DASHBOARD_PAGE_LOADED, DASHBOARD_PAGE_UNLOADED } from 'constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_PAGE_LOADED:
      return {
        ...state,
        foundations: action.payload.foundations,
      };
    case DASHBOARD_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
