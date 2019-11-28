import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const MenuItemGroup = Menu.ItemGroup;

const RightMenu = () => (
  <Menu mode="horizontal">
    <Menu.Item key="mail">
      {/* <Link to="/login" className="nav-link">
        Sign in
      </Link>
    </Menu.Item>
    <Menu.Item key="app">
      <Link to="/register" className="nav-link">
        Sign up
      </Link> */}
    </Menu.Item>
  </Menu>
);

export default RightMenu;
