import React from 'react';
import ListPagination from 'components/ListPagination';
import GrantPreview from './GrantPreview';

const GrantList = (props) => {
  if (!props.grants) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.grants.length === 0) {
    return (
      <div className="article-preview">
        No articles are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.grants.map((grant) => (
          <GrantPreview grant={grant} key={grant.slug} />
        ))
      }

      <ListPagination
        pager={props.pager}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default GrantList;
