import { connect } from 'react-redux';
import React from 'react';
import agent from 'agent';
import {
  GRANTS_PAGE_LOADED,
  GRANTS_PAGE_UNLOADED,
} from 'constants/actionTypes';
import { Button, Input } from 'antd';
import FoundationsView from './GrantsView';

const { Promise } = global;

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});


const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: GRANTS_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: GRANTS_PAGE_UNLOADED }),
});


class Grants extends React.Component {
  componentWillMount() {
    const grantsPromise = agent.Grants.all;
    this.props.onLoad(
      Promise.all([grantsPromise()]),
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="grants-page">
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
                  Grants and Fellowships
                </h2>
                <span>
                  <p style={{ color: 'white', 'font-size': '16px' }}>Apply to grants and prizes created by awesome founders .</p>
                  <Input.Search
                    placeholder="Search grants by tag"
                    enterButton="Search"
                    size="medium"
                    onSearch={(value) => console.log(value)}
                  />
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

export default connect(mapStateToProps, mapDispatchToProps)(Grants);
