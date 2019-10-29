import React from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'antd';
import 'antd/dist/antd.css';

const mapDispatchToProps = () => ({
  favorite: () => (
    // eslint-disable-next-line no-console
    console.log('fav!')
  ),
});

const GrantPreview = (props) => {
  const { grant } = props;

  const { title, slug, author } = grant;

  return (

    <Card title={title} extra={<Button type="primary">Apply</Button>} style={{ marginTop: '50px' }}>
      <p>{`slug: ${slug}`}</p>
      <p>{`author: ${author.username}`}</p>

    </Card>
  );
};

export default connect(() => ({}), mapDispatchToProps)(GrantPreview);
