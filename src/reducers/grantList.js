import {
  HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, CHANGE_TAB, GRANTS_PAGE_LOADED, GRANTS_PAGE_UNLOADED,
} from 'constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        tags: action.payload[0] ? action.payload[0].tags : [],
        grants: action.payload[1] ? action.payload[1].grants : [],
        grantsCount: action.payload[1] ? action.payload[1].grantsCount : [],
        currentPage: 0,
        tab: action.tab,
      };
    case GRANTS_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        tags: action.payload[0] ? action.payload[0].tags : [],
        grants: action.payload[1] ? action.payload[1].grants : [],
        grantsCount: action.payload[1] ? action.payload[1].grantsCount : [],
        currentPage: 0,
        tab: action.tab,
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case GRANTS_PAGE_UNLOADED:
      return {};
    case CHANGE_TAB:
      if (action.tab === 'grants') {
        return {
          ...state,
          pager: action.pager,
          tags: action.payload[0] ? action.payload[0].tags : [],
          grants: action.payload[1] ? action.payload[1].grants : [],
          grantsCount: action.payload[1] ? action.payload[1].grantsCount : [],
          currentPage: 0,
          tab: action.tab,
        };
      }
      return state;

    default:
      return state;
  }
};
