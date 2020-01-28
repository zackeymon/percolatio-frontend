import { connect } from 'react-redux';
import React from 'react';
import agent from 'agent';
import { Link } from 'react-router-dom';
import {
  FOUNDATIONS_PAGE_LOADED,
  FOUNDATIONS_PAGE_UNLOADED,
} from 'constants/actionTypes';
import { Button } from 'antd';
import FoundationsView from './FoundationsView';

const { Promise } = global;

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});


const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: FOUNDATIONS_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: FOUNDATIONS_PAGE_UNLOADED }),
});


class Foundations extends React.Component {
  componentWillMount() {
    const foundationPromise = agent.Foundations.all;
    this.props.onLoad(
      Promise.all([foundationPromise()]),
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="foundations-page">
        <div className="container page">
          <div className="row">
            <div
              className="banner"
              style={{
                'text-align': 'center',
                display: 'flex',
                width: '850px',
                border: '2px solid #fff',
                'border-radius': '15px',
                'moz-border-radius': '15px',
              }}
            >
              <div className="container">
                <h2 className="logo-font">
                  Foundations
                </h2>
                <span>
                  <p style={{ color: 'white', 'font-size': '16px' }}>Discover and sponsor foundations you care about. Or create your own.</p>
                  <Link to="/new-foundation">
                    <Button> Create a Foundation </Button>
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <FoundationsView />
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Foundations);
