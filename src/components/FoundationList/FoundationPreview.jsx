import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Card, Avatar, Row, Col,
} from 'antd';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';

const mapDispatchToProps = () => ({
  favorite: () => (
    // eslint-disable-next-line no-console
    console.log('fav!')
  ),
});

const FoundationPreview = (props) => {
  const { foundation } = props;

  const {
    name, description, followersCount, tagList,
  } = foundation;

  return (

    <Card
      title={name}
      extra={(
        <div>
          <Button href={`/foundations/${name}/donate`} type="primary">Sponsor</Button>
          {' '}
          <Link to={`/foundations/${name}`}>

            <Button>See More</Button>

          </Link>
        </div>
)}
      style={{ marginTop: '50px' }}
    >
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={5}>
            <Avatar
              shape="circle"
              size={80}
            >
              {name.charAt(0)}
            </Avatar>
          </Col>
          <Col span={13}>
            <ul>
              <li>
              Description:
                {''}
                {`${description}`}
              </li>

              <li>
                Tags:
                {''}
                {`${tagList}`}
              </li>
            </ul>

          </Col>
          <Col span={6}>
            <Row>
              Current Grants: Grant 1, 2...
            </Row>

            <Row>
              Followers:
              {' '}
              {`${followersCount}`}
            </Row>

          </Col>
        </Row>
      </div>


    </Card>
  );
};

export default connect(() => ({}), mapDispatchToProps)(FoundationPreview);
