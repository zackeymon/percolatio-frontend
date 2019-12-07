import {
  HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, CHANGE_TAB,
  FOUNDATIONS_PAGE_LOADED, FOUNDATIONS_PAGE_UNLOADED,
} from 'constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        foundations: action.payload[2] ? action.payload[2].foundations : [],
        foundationsCount: action.payload[2] ? action.payload[2].foundationsCount : [],
        currentPage: 0,
        tab: action.tab,
      };
    case FOUNDATIONS_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        foundations: action.payload[0] ? action.payload[0].foundations : [],
        foundationsCount: action.payload[0] ? action.payload[0].foundationsCount : [],
        currentPage: 0,
      };
    case FOUNDATIONS_PAGE_UNLOADED:
      return {};
    case HOME_PAGE_UNLOADED:
      return {};
    case CHANGE_TAB:
      if (action.tab === 'foundations') {
        return {
          ...state,
          pager: action.pager,
          foundations: action.payload[2] ? action.payload[2].foundations : [],
          foundationsCount: action.payload[2] ? action.payload[2].foundationsCount : [],
          currentPage: 0,
          tab: action.tab,
        };
      }
      return state;

    default:
      return state;
  }
};
