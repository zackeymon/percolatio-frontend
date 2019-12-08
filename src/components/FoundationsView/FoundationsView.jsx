import React from 'react';
import { connect } from 'react-redux';
import agent from 'agent';
import FoundationList from '../FoundationList';


const callback = (key) => {
  console.log(key);
};


const mapStateToProps = (state) => ({
  ...state.foundationList,
  tags: state.home.tags,
  token: state.common.token,
});

const FoundationsView = (props) => (
  <div className="col-md-9">
    <div className="feed-toggle">
      <FoundationList
        pager={props.pager}
        foundations={props.foundations}
        loading={props.loading}
        grantsCount={props.foundationsCount}
        currentPage={props.currentPage}
      />
    </div>
  </div>
);

export default connect(mapStateToProps)(FoundationsView);
