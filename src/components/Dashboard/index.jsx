import { connect } from 'react-redux';
import React from 'react';
import agent from 'agent';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from 'constants/actionTypes';

import { Row, Tabs, Col } from 'antd';
import ActionCenterCard from './ActionCenterCard';
import GrantOverviewCard from './GrantOverviewCard';
import FoundationOverviewCard from './FoundationOverviewCard';

const { TabPane } = Tabs;

const { Promise } = global;

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) => dispatch({
    type: APPLY_TAG_FILTER, tag, pager, payload,
  }),
  onLoad: (tab, pager, payload) => dispatch({
    type: HOME_PAGE_LOADED, tab, pager, payload,
  }),
  onUnload: () => dispatch({
    type: HOME_PAGE_UNLOADED,
  }),
});

class Home extends React.Component {
  componentWillMount() {
    const articlesPromise = agent.Articles.all;
    this.props.onLoad('all', articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="container page">
        <Row>
          <Tabs defaultActiveKey="overview">
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
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
