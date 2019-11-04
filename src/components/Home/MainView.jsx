import React from 'react';
import { connect } from 'react-redux';
import agent from 'agent';
import { Tabs } from 'antd';
import GrantList from '../GrantList';
import FoundationList from '../FoundationList';

const { TabPane } = Tabs;

const callback = (key) => {
  console.log(key);
};

const FeaturedGrantsTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick('grants', agent.Grants.all, agent.Grants.all());
  };
  return (
    <li className="nav-item">
      <button
        type="button"
        className={props.tab === 'grants' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}
      >
        Featured Grants
      </button>
    </li>
  );
};

const mapStateToProps = (state) => ({
  ...state.grantList,
  ...state.foundationList,
  tags: state.home.tags,
  token: state.common.token,
});

const MainView = (props) => (
  <div className="col-md-9">
    <div className="feed-toggle">
      <Tabs defaultActiveKey="grants" onChange={callback}>
        <TabPane tab="Grants" key="grants">
          <GrantList
            pager={props.pager}
            grants={props.grants}
            loading={props.loading}
            grantsCount={props.grantsCount}
            currentPage={props.currentPage}
          />
        </TabPane>
        <TabPane tab="Foundations" key="foundations">
          <FoundationList
            pager={props.pager}
            foundations={props.foundations}
            loading={props.loading}
            grantsCount={props.foundationsCount}
            currentPage={props.currentPage}
          />
        </TabPane>

      </Tabs>


    </div>
  </div>
);

export default connect(mapStateToProps)(MainView);
