import { connect } from 'react-redux';
import React from 'react';
import agent from 'agent';
import {
  DASHBOARD_PAGE_LOADED,
  DASHBOARD_PAGE_UNLOADED,
} from 'constants/actionTypes';

import {
  Row, Tabs, Col, Button, Icon,
} from 'antd';
import ActionCenterCard from './ActionCenterCard';
import GrantOverviewCard from './GrantOverviewCard';
import FoundationOverviewCard from './FoundationOverviewCard';
import FoundationTab from './FoundationTab';

const { TabPane } = Tabs;

const mapStateToProps = (state) => ({
  ...state.dashboard,
  currentUser: state.common.currentUser,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({
    type: DASHBOARD_PAGE_LOADED, payload,
  }),
  onUnload: () => dispatch({
    type: DASHBOARD_PAGE_UNLOADED,
  }),
});

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.onLoad(agent.Foundations.byFounder(this.props.currentUser.username));
  }

  // componentWillUnmount() {
  //   this.props.onUnload();
  // }

  render() {
    const operations = (
      <Button href="/foundation">
        <Icon type="plus" />
        {' '}
        New Foundation
      </Button>
    );

    // Be aware when working with antd tabs https://github.com/ant-design/ant-design/issues/17492
    return (
      <div className="container page">
        <h1>
          yo
          {' '}
          {this.props.currentUser.username}
        </h1>
        <Row>
          <Tabs defaultActiveKey="overview" tabBarExtraContent={operations}>
            <TabPane tab="Overview" key="overview">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ActionCenterCard />
                </Col>
                <Col span={12}>
                  <GrantOverviewCard />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <FoundationOverviewCard />
                </Col>
              </Row>
            </TabPane>
            {this.props.foundations
              && this.props.foundations.map(
                (foundation) => (
                  <TabPane tab={foundation.name} key={foundation.name}>
                    <FoundationTab foundation={foundation} />
                  </TabPane>
                ),
              )}
          </Tabs>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
