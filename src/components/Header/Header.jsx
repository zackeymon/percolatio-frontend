import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from '../UserMenu';

const LoggedOutView = (props) => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li>

      </ul>
    );
  }
  return null;
};

const LoggedInView = (props) => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li id="home" className="nav-item">
          <Link to="/homehome" className="nav-link">
            Home
          </Link>
        </li>

        <li id="foundations" className="nav-item">
          <Link to="/foundation" className="nav-link">
            Foundations
          </Link>
        </li>

        <li id="grants" className="nav-item">
          <Link to="/grant" className="nav-link">
            Grants
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <i className="ion-compose" />
            {' '}
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <UserMenu user={props.currentUser.username} style={{ border: '3px' }} />
        </li>

      </ul>
    );
  }

  return null;
};


const Header = (props) => (
  <nav className="navbar navbar-light">
    <div className="container">

      <Link to="/" className="navbar-brand">
        {props.appName.toLowerCase()}
      </Link>

      <LoggedOutView currentUser={props.currentUser} />

      <LoggedInView currentUser={props.currentUser} />
    </div>
  </nav>
);


export default Header;
