import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import agent from 'agent';
import { DELETE_GRANT } from 'constants/actionTypes';

const mapDispatchToProps = (dispatch) => ({
  onClickDelete: (payload) => dispatch({ type: DELETE_GRANT, payload }),
});

const GrantActions = (props) => {
  const { grant } = props;
  const del = () => {
    props.onClickDelete(agent.Grants.del(grant.slug));
  };
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/grants/${grant.slug}`}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit" />
          {' '}
        Edit Grant
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a" />
          {' '}
        Delete Grant
        </button>

      </span>
    );
  }

  return (
    <span />
  );
};

export default connect(() => ({}), mapDispatchToProps)(GrantActions);
