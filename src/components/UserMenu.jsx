import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { LOGOUT } from 'constants/actionTypes';
import { connect } from 'react-redux';


const { SubMenu } = Menu;

const mapStateToProps = (state) => ({
  ...state.settings,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
});

class UserMenu extends React.Component {
  handleClick = (e) => {
    console.log('click ', e);
  };

  render() {
    return (
      <Menu onClick={this.handleClick} mode="horizontal">

        <SubMenu
          title={(
            <span className="submenu-title-wrapper">
              {this.props.user}
            </span>
)}
        >
          <Menu.ItemGroup title="Percolatio">
            <Menu.Item key="setting:1">

              <Link
                to={`/@${this.props.user}`}
                className="nav-link"
              >
              My Profile
              </Link>

            </Menu.Item>
            <Menu.Item key="setting:2">
              <Link
                to={`/@${this.props.user}`}
                className="nav-link"
              >
              My Foundations
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:3">
              <Link
                to={`/@${this.props.user}`}
                className="nav-link"
              >
              My Donations
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:4">
              <Link
                to={`/@${this.props.user}`}
                className="nav-link"
              >
              My Applications
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="My Account">
            <Menu.Item key="setting:5">
              <Link to="/settings" className="nav-link">
              Settings
              </Link>

            </Menu.Item>
            <Menu.Item onClick={this.props.onClickLogout} key="setting:7">Log Out</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>

      </Menu>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
