import React from 'react';

const FoundationTab = (props) => {
  const { foundation, grants } = props;
  return (
    <>
      <h1>{foundation.name}</h1>
      <p>{foundation.description}</p>
      {grants.length > 0
        ? grants.map((grant) => (
          <p key={grant.slug}>
            {grant.slug}
          </p>
        ))
        : <p>This foundation has no grant yet</p>}
    </>
  );
};

export default FoundationTab;
