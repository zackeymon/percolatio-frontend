import React from 'react';
import { connect } from 'react-redux';
import GrantList from 'components/GrantList';
import agent from 'agent';

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
  tags: state.home.tags,
  token: state.common.token,
});

const MainView = (props) => (
  <div className="col-md-9">
    <div className="feed-toggle">

      <GrantList
        pager={props.pager}
        grants={props.grants}
        loading={props.loading}
        grantsCount={props.grantsCount}
        currentPage={props.currentPage}
      />

    </div>
  </div>
);

export default connect(mapStateToProps)(MainView);
