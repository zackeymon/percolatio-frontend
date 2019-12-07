import React from 'react';
import agent from 'agent';
import { connect } from 'react-redux';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT,
} from 'constants/actionTypes';
import { Avatar, Button, Icon } from 'antd';
import ListErrors from './ListErrors';
import SettingsForm from './SettingsForm';


const mapStateToProps = (state) => ({
  ...state.settings,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: (user) => dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED }),
});

const Settings = (props) => (
  <div className="settings-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">

          <h1 className="text-xs-center">Edit your Profile</h1>

          <ListErrors errors={props.errors} />
          <div>
            <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
              <Avatar size={180} icon="user" />
            </div>
            <div style={{ margin: '20px', display: 'flex', justifyContent: 'center' }}>
              <Button>
                <Icon type="upload" />
                {' '}
                Upload your Profile pic
              </Button>
            </div>

          </div>


          <SettingsForm
            currentUser={props.currentUser}
            onSubmitForm={props.onSubmitForm}
          />

          <hr />

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={props.onClickLogout}
            style={{ margin: '10px' }}
          >
              Or click here to logout.
          </button>

        </div>
      </div>
    </div>
  </div>
);


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
