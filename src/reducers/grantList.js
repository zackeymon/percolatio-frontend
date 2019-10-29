import { CHANGE_TAB } from 'constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case CHANGE_TAB:
      if (action.tab !== 'grants') {
        return state;
      }
      return {
        ...state,
        pager: action.pager,
        grants: action.payload.grants,
        grantsCount: action.payload.articlesCount,
        tab: action.tab,
        currentPage: 0,
        tag: null,
      };
    default:
      return state;
  }
};
