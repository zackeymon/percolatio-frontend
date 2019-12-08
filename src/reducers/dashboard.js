import { DASHBOARD_PAGE_UNLOADED, FETCH_FOUNDATIONS_SUCCESS, FETCH_GRANTS_SUCCESS } from 'constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FOUNDATIONS_SUCCESS:
      return {
        ...state,
        foundations: action.payload.foundations,
      };
    case FETCH_GRANTS_SUCCESS:
      return {
        ...state,
        grantsForFoundation: {
          ...state.grantsForFoundation,
          [action.payload.foundationName]: action.payload.grants,
        },
      }
    case DASHBOARD_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
