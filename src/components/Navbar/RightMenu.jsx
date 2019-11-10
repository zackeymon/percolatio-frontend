import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const MenuItemGroup = Menu.ItemGroup;

const RightMenu = () => (
  <Menu mode="horizontal">
    <Menu.Item key="mail">
      <a href="/">Signin</a>
    </Menu.Item>
    <Menu.Item key="app">
      <a href="/">Signup</a>
    </Menu.Item>
  </Menu>
);

export default RightMenu;
