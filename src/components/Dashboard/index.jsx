import { connect } from 'react-redux';
import React from 'react';
import agent from 'agent';
import { Link } from 'react-router-dom';
import {
  DASHBOARD_PAGE_LOADED,
  DASHBOARD_PAGE_UNLOADED,
  FETCH_FOUNDATIONS_SUCCESS,
  FETCH_FOUNDATIONS_ERROR,
  FETCH_GRANTS_SUCCESS,
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

const fetchFoundationsByFounderAndGrantsActionCreator = (username) => (dispatch, getState) => {
  dispatch({
    type: DASHBOARD_PAGE_LOADED,
  });
  // fetch foundations first
  return agent.Foundations.byFounder(username).then(
    (res) => {
      dispatch({
        type: FETCH_FOUNDATIONS_SUCCESS,
        payload: res,
      });

      const { foundations } = getState().dashboard;

      // fetch grant for each foundation
      foundations.forEach((foundation) => {
        const foundationName = foundation.name;
        agent.Grants.byFoundation(foundationName).then(
          ({ grants }) => {
            dispatch({
              type: FETCH_GRANTS_SUCCESS,
              payload: {
                foundationName,
                grants,
              },
            });
          },
        );
      });
    },
  );
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (username) => {
    dispatch(fetchFoundationsByFounderAndGrantsActionCreator(username));
  },
  onUnload: () => dispatch({
    type: DASHBOARD_PAGE_UNLOADED,
  }),
});

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.onLoad(this.props.currentUser.username);
  }

  // componentWillUnmount() {
  //   this.props.onUnload();
  // }

  render() {
    const operations = (
      <Link to="/new-foundation">
        <Button>
          <Icon type="plus" />
          {' '}
        New Foundation
        </Button>
      </Link>
    );

    const { foundations, grantsForFoundation } = this.props;

    const allGrants = grantsForFoundation ? Object.values(grantsForFoundation)[0] : null;

    // Be aware when working with antd tabs https://github.com/ant-design/ant-design/issues/17492
    return (
      <div className="container page">
        <h1>
          {this.props.currentUser.username}
          {' '}
          HQ
        </h1>
        <Row>
          <Tabs defaultActiveKey="overview" tabBarExtraContent={operations}>
            <TabPane tab="Overview" key="overview">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ActionCenterCard />
                </Col>
                <Col span={12}>
                  <GrantOverviewCard grants={allGrants} />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <FoundationOverviewCard />
                </Col>
              </Row>
            </TabPane>
            {foundations
              && foundations.map(
                (foundation) => (
                  <TabPane tab={foundation.name} key={foundation.name}>
                    {grantsForFoundation && (
                      <FoundationTab
                        foundation={foundation}
                        grants={grantsForFoundation[foundation.name]}
                      />
                    )}
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
