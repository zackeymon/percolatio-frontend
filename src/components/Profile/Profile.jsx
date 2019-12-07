import React from 'react';
import { Link } from 'react-router-dom';
import agent from 'agent';
import { connect } from 'react-redux';
import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from 'constants/actionTypes';
import { Tabs, Avatar, Button } from 'antd';


const { TabPane } = Tabs;


const EditProfileSettings = (props) => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
      >
        <Button size="large" type="primary" style={{ float: 'right' }}>Edit Profile Settings</Button>

      </Link>
    );
  }
  return null;
};

const FollowUserButton = (props) => {
  if (props.isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (props.user.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = (ev) => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username);
    } else {
      props.follow(props.user.username);
    }
  };


  return (
    <button
      type="button"
      className={classes}
      onClick={handleClick}
    >
      <i className="ion-plus-round" />
      &nbsp;
      {props.user.following ? 'Unfollow' : 'Follow'}
      {' '}
      {props.user.username}
    </button>
  );
};

const mapStateToProps = (state) => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  onFollow: (username) => dispatch({
    type: FOLLOW_USER,
    payload: agent.Profile.follow(username),
  }),
  onLoad: (payload) => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnfollow: (username) => dispatch({
    type: UNFOLLOW_USER,
    payload: agent.Profile.unfollow(username),
  }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
});

class Profile extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.match.params.username),
      agent.Articles.byAuthor(this.props.match.params.username),
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    const callback = (key) => {
      console.log(key);
    };
    return (
      <Tabs onChange={callback} type="card">
        <TabPane tab="My Foundations" key="1">
          {this.props.profile.username}
        </TabPane>
        <TabPane tab="My Donations" key="2">
        You have not sponsored any foundation yet
        </TabPane>
        <TabPane tab="My Applications" key="3">
        You have not applied to any grant yet
        </TabPane>
      </Tabs>
    );
  }

  render() {
    const { profile } = this.props;
    if (!profile) {
      return null;
    }

    const isUser = this.props.currentUser
    && this.props.profile.username === this.props.currentUser.username;

    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

                <Avatar size={84} style={{ margin: '5px', color: 'blue', backgroundColor: 'white' }}>U</Avatar>
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  user={profile}
                  follow={this.props.onFollow}
                  unfollow={this.props.onUnfollow}
                />

              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">

              <div className="articles-toggle">
                {this.renderTabs()}
              </div>


            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
