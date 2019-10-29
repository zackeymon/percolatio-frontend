import React from 'react';
import { connect } from 'react-redux';
import GrantList from 'components/GrantList';
import ArticleList from 'components/ArticleList';
import agent from 'agent';
import { CHANGE_TAB } from 'constants/actionTypes';

const GlobalFeedTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <button
        type="button"
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}
      >
        Global Feed
      </button>
    </li>
  );
};

const FeaturedGrantsTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick('grants', agent.Grants.all, agent.Grants.all());
  };
  return (
    <li className="nav-item">
      <button
        type="button"
        className={props.tab === 'grants' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}
      >
        Featured Grants
      </button>
    </li>
  );
};

const TagFilterTab = (props) => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <button
        type="button"
        className="nav-link active"
      >
        <i className="ion-pound" />
        {' '}
        {props.tag}
      </button>
    </li>
  );
};

const mapStateToProps = (state) => ({
  ...state.articleList,
  ...state.grantList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) => dispatch({
    type: CHANGE_TAB, tab, pager, payload,
  }),
});

const MainView = (props) => (
  <div className="col-md-9">
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">

        <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

        <FeaturedGrantsTab tab={props.tab} onTabClick={props.onTabClick} />

        <TagFilterTab tag={props.tag} />

      </ul>
    </div>

    {props.tab === 'grants' && (
      <GrantList
        pager={props.pager}
        grants={props.grants}
        loading={props.loading}
        grantsCount={props.grantsCount}
        currentPage={props.currentPage}
      />
    )}

    {props.tab === 'all' && (
      <ArticleList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
      />
    )}

  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
