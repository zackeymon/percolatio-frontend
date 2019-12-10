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
        There are no grants in Percolatio... yet.
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
        grantsCount={props.grantsCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default GrantList;
