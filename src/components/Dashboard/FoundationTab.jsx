import React from 'react';
import { connect } from 'react-redux';
import agent from 'agent';
import { DASHBOARD_FOUNDATIONS_LOADED } from 'constants/actionTypes';

const mapStateToProps = (state, ownProps) => {
  const { grantsForFoundation } = state.dashboard;
  return {
    grants: grantsForFoundation && ownProps.foundation.name in grantsForFoundation
      ? grantsForFoundation[ownProps.foundation.name]
      : null,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({
    type: DASHBOARD_FOUNDATIONS_LOADED, payload,
  }),
});

class FoundationTab extends React.Component {
  constructor(props) {
    super(props);
    this.props.onLoad(agent.Grants.byFoundation(this.props.foundation.name));
  }

  render() {
    const { foundation, grants } = this.props;
    return (
      <>
        <h1>{foundation.name}</h1>
        <p>{foundation.description}</p>
        {grants && grants.map((grant) => (
          <p key={grant.slug}>
            {grant.slug}
          </p>
        ))}
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FoundationTab);
