import React from 'react';
import { connect } from 'react-redux';
import agent from 'agent';
import GrantList from '../GrantList';


const callback = (key) => {
  console.log(key);
};


const mapStateToProps = (state) => ({
  ...state.foundationList,
  tags: state.home.tags,
  token: state.common.token,
});

const GrantsView = (props) => (
  <div className="col-md-9">
    <div className="feed-toggle">
      <GrantList
        pager={props.pager}
        foundations={props.foundations}
        loading={props.loading}
        grantsCount={props.foundationsCount}
        currentPage={props.currentPage}
      />
    </div>
  </div>
);

export default connect(mapStateToProps)(GrantsView);
