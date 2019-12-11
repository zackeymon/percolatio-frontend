import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import UserMenu from './UserMenu';

const { SubMenu } = Menu;
const { Sider } = Layout;

const handleClick = (e) => {
    console.log('click ', e);
};

const PercSider = (props) => (
    <Sider
        style={{ background: 'white', width: '400' }}
    >
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
        >
            <SubMenu
                key="sub1"
                title={
                    <span>
                        Actions
                    </span>
                }
            >
                <Menu.ItemGroup key="g1" title="Be a founder">
                    <Menu.Item key="0">
                        <Link to="/homehome" className="nav-link">
                            Grants
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to="/foundation" className="nav-link">
                            Foundations
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/new-foundation" className="nav-link">
                            Create Foundation
                        </Link>
                    </Menu.Item>
                </Menu.ItemGroup>
                <Menu.Item key="3">
                    <Link to="/grant" className="nav-link">
                        Create Grant
                    </Link>
                </Menu.Item>

                <Menu.ItemGroup key="g2" title="Manage Applications">
                    <Menu.Item key="3">Aply</Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
        </Menu>
    </Sider>
);


export default PercSider;
