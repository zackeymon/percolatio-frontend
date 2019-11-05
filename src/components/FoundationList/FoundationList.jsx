import React from 'react';
import ListPagination from 'components/ListPagination';
import FoundationPreview from './FoundationPreview';

const FoundationList = (props) => {
  if (!props.foundations) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.foundations.length === 0) {
    return (
      <div className="article-preview">
        There are no foundations in Percolatio... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.foundations.map((foundation) => (
          <FoundationPreview foundation={foundation} key={foundation.name} />
        ))
      }

      <ListPagination
        pager={props.pager}
        articlesCount={props.foundationsCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default FoundationList;
