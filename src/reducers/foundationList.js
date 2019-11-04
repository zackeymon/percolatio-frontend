import {
  HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, CHANGE_TAB,
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
