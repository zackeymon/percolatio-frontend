import { Link } from 'react-router-dom';
import React from 'react';
import GrantActions from './GrantActions';

const GrantMeta = (props) => {
  const { grant } = props;
  return (
    <div className="article-meta">
      <Link to={`/@${grant.author.username}`}>
        <img src={grant.author.image} alt={grant.author.username} />
      </Link>

      <div className="info">
        <Link to={`/@${grant.author.username}`} className="author">
          {grant.author.username}
        </Link>
        <span className="date">
          {new Date(grant.createdAt).toDateString()}
        </span>
      </div>

      <GrantActions canModify={props.canModify} grant={grant} />
    </div>
  );
};

export default GrantMeta;
