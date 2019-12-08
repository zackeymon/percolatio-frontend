import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
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
          <Link to="/">
            <img
              href="/"
              alt="percolatio logo"
              src="https://s3.eu-west-2.amazonaws.com/percolation.images/frontend/logo.png"
              height="50%"
              width="50%"
            />
          </Link>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu />
          </div>
          <div className="rightMenu">
            <RightMenu currentUser={this.props.currentUser} />
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
            <RightMenu currentUser={this.props.currentUser} />
          </Drawer>

        </div>
      </nav>
    );
  }
}

export default Navbar;
