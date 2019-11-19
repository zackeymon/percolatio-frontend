import React, { Component } from 'react';
import { Drawer, Button } from 'antd';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import './Navbar.css';

class Navbar extends Component {
  state = {
    current: 'mail',
    visible: false,
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <nav className="menuBar">
        <div className="logo">
          <img href="/" src="https://s3.eu-west-2.amazonaws.com/percolation.images/frontend/logoName.png" height="120%" width="120%" />
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu />
          </div>
          <div className="rightMenu">
            <RightMenu />
          </div>
          <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
            <span className="barsBtn" />
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <LeftMenu />
            <RightMenu />
          </Drawer>

        </div>
      </nav>
    );
  }
}

export default Navbar;
