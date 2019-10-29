import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import article from 'reducers/article';
import articleList from 'reducers/articleList';
import auth from 'reducers/auth';
import common from 'reducers/common';
import editor from 'reducers/editor';
import grantList from 'reducers/grantList';
import home from 'reducers/home';
import profile from 'reducers/profile';
import settings from 'reducers/settings';

export default combineReducers({
  article,
  articleList,
  auth,
  common,
  editor,
  grantList,
  home,
  profile,
  settings,
  router: routerReducer,
});
