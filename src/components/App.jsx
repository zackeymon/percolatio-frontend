import agent from 'agent';
import React from 'react';
import { Form } from 'antd';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from 'constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import { store } from 'store';
import { push } from 'react-router-redux';
import LandingPage from 'components/LandingPage';
import { withRouter } from 'react-router';
import Article from './Article';
import Editor from './Editor';
import Header from './Header';
import Home from './Home';
import LoginForm from './Login';
import Profile from './Profile';
import ProfileFavorites from './ProfileFavorites';
import RegisterForm from './Register/Register';
import Dashboard from './Dashboard';
import Settings from './Settings';
import ApplicationFormPage from './ApplicationFormPage';
import Grant from './Grant';
import Foundation from './Foundation';


const mapStateToProps = (state) => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) => dispatch({
    type: APP_LOAD, payload, token, skipTracking: true,
  }),
  onRedirect: () => dispatch({
    type: REDIRECT,
  }),
});

class App extends React.Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('jwt');
    this.loginForm = Form.create({ name: 'normal_login' })(LoginForm);
    this.registerForm = Form.create({ name: 'register' })(RegisterForm);
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          {this.props.location.pathname !== '/'
            && (
              <Header
                appName={this.props.appName}
                currentUser={this.props.currentUser}
              />
            )}
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/homehome" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={this.loginForm} />
            <Route path="/register" component={this.registerForm} />
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/apply" component={ApplicationFormPage} />
            <Route path="/grant/:slug" component={Grant} />
            <Route path="/foundation/:name" component={Foundation} />
            <Route path="/article/:id" component={Article} />
            <Route path="/settings" component={Settings} />
            <Route path="/@:username/favorites" component={ProfileFavorites} />
            <Route path="/@:username" component={Profile} />
          </Switch>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
