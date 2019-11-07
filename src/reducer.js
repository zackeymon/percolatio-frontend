import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import article from 'reducers/article';
import articleList from 'reducers/articleList';
import auth from 'reducers/auth';
import common from 'reducers/common';
import editor from 'reducers/editor';
import grantList from 'reducers/grantList';
import grant from 'reducers/grant';
import foundationList from 'reducers/foundationList';
import home from 'reducers/home';
import profile from 'reducers/profile';
import settings from 'reducers/settings';
import foundation from 'reducers/foundation';

export default combineReducers({
  article,
  articleList,
  auth,
  common,
  editor,
  grant,
  foundation,
  grantList,
  foundationList,
  home,
  profile,
  settings,
  router: routerReducer,
});
