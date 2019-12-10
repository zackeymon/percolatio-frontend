import React from 'react';
import { connect } from 'react-redux';
import agent from 'agent';
import GrantList from '../GrantList';


const callback = (key) => {
  console.log(key);
};


const mapStateToProps = (state) => ({
  ...state.grantList,
  tags: state.home.tags,
  token: state.common.token,
});

const GrantsView = (props) => (
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

export default connect(mapStateToProps)(GrantsView);
