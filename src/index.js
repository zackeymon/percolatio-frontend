import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import LandingPage from 'components/LandingPage/LandingPage';
import App from 'components/App';
import { store, history } from 'store';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={LandingPage} />
      </Switch>
    </ConnectedRouter>
  </Provider>

), document.getElementById('root'));
