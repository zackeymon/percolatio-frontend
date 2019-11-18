import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

const LoggedOutView = (props) => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">
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
        <li className="nav-item">
          <Link to="/new-foundation" className="nav-link">
            <i className="ion-compose" />
            {' '}
            Create Foundation
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/new-grant" className="nav-link">
            <i className="ion-compose" />
            {' '}
            Create Grant
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/apply" className="nav-link">
            <i className="ion-compose" />
            {' '}
            Apply
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


const pHeader = (props) => (

  <Header>
    <Link to="/" className="navbar-brand">
      {/* {props.appName.toLowerCase()} */}
      <img src="https://s3.eu-west-2.amazonaws.com/percolation.images/frontend/logoName.png" width='15%' height='15%' />
    </Link>

    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="1">nav 1</Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3">nav 3</Menu.Item>
    </Menu>
  </Header>
  // <nav className="navbar navbar-light">
  //   <div className="container">
  // {/* <LoggedOutView currentUser={props.currentUser} /> */ }
  // {/* <LoggedInView currentUser={props.currentUser} /> */ }
  //   </div>
  // </nav>
);


export default pHeader;
