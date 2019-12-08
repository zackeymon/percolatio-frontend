import React from 'react';
import {
  Card,
} from 'antd';

const GrantOverviewCard = (props) => (
  <Card title="Grant Overview">
    {props.grants && props.grants.map((grant) => (<p key={grant.slug}>{grant.slug}</p>))}
  </Card>
);

export default GrantOverviewCard;
