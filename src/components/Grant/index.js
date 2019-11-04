
import React from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import agent from 'agent';
import { GRANT_PAGE_LOADED, GRANT_PAGE_UNLOADED } from 'constants/actionTypes';

const mapStateToProps = (state) => ({
  ...state.grant,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: GRANT_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: GRANT_PAGE_UNLOADED }),
});

class Grant extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Grants.get(this.props.match.params.id),
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.grant) {
      return null;
    }

    const markup = { __html: marked(this.props.grant.body, { sanitize: true }) };
    const canModify = this.props.currentUser
      && this.props.currentUser.username === this.props.grant.author.username;
    return (
      <div className="grant-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.grant.title}</h1>
          </div>
        </div>

        <div className="container page">

          <div className="row grant-content">
            <div className="col-xs-12">

              <div dangerouslySetInnerHTML={markup} />

              <ul className="tag-list">
                {
                  this.props.grant.tagList.map((tag) => (
                    <li
                      className="tag-default tag-pill tag-outline"
                      key={tag}
                    >
                      {tag}
                    </li>
                  ))
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="grant-actions" />

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grant);
