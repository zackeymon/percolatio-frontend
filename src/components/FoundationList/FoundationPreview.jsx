import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Card, Avatar, Row, Col, Typography, 
} from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import Jdenticon from 'react-jdenticon';
import Donation from '../Foundation/Donation';

const { Title, Text } = Typography;

const mapDispatchToProps = () => ({
  favorite: () => (
    // eslint-disable-next-line no-console
    console.log('fav!')
  ),
});

const titleCase = (str) => {
  const splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
};

const getAction = () => {
  const possibleActions = ['created', 'updated', 'published'];
  return possibleActions[Math.floor(Math.random() * possibleActions.length)];
};

const formatDate = (date) => {
  return "March 2019";
}


const FoundationPreview = (props) => {
  const { foundation } = props;

  const { name } = foundation;

  return (

    <Card
      title={(
        <Text>
          &nbsp;
          <Text strong>
            <Avatar style={{ color: '#035f66', backgroundColor: '#cffcee', marginRight: '20px' }}>
              {foundation.founder.username[0].toUpperCase()}
            </Avatar>
          </Text>
          <Text>
            Founded by
            {' '}
          </Text>
          &nbsp;
          <Text strong>
            <Link to={`/foundation/${foundation.name}`} className="preview-link">
              {foundation.founder.username}
            </Link>
          </Text>
        </Text>
    )}
      headStyle={{ border: 0 }}
      bodyStyle={{ borderTop: '1px solid #e8e8e8' }}
      style={{
        // border: 0,
        marginTop: '10px',
      }}
      extra={(
        <div>
          <Link to={`/foundation/${name}`}>
            <Button type="primary">Sponsor</Button>
          </Link> 
          {' '}
          <Link to={`/foundation/${name}`}>

            <Button>See More</Button>

          </Link>
        </div>
)}

    >
    <div>
      <Row>
        <Col span={8} type="flex" justify="space-around" align="center">
          <Jdenticon size="80" value={`${foundation.name}`} />
          <div>
            <strong>Created at:</strong>
            {' '}
            {formatDate(foundation.createdAt)}
          </div>
        </Col>
        <Col span={12} type="flex">
          <Row>
            <Link to={`/foundation/${foundation.name}`} className="preview-link">
              <Title level={4}>
                {titleCase(foundation.name)}
              </Title>
            </Link>
          </Row>
          <Row>
            <Text>
              {foundation.description}
              <Link to={`/foundation/${foundation.slug}`}>
                ...
              </Link>
            </Text>
          </Row>
          <Row>
            <ul className="tag-list">
              {
                foundation.tagList.map((tag) => (
                  <li
                    className="tag-default tag-pill tag-outline"
                    key={tag}
                  >
                    {tag}
                  </li>
                ))
              }
            </ul>
          </Row>
          <Row style={{ height: '100%' }} align="bottom">
            {titleCase(foundation.name)}
            {' '}
            has currently
            {' '}
            <Text strong>{Math.floor(Math.random() * 3)}</Text>
            {' '}
            active grants.
          </Row>
        </Col>
      </Row>
      <Row style={{ marginTop: '30px' }}>
        <Col span={6} type="flex" justify="space-around" align="middle">
          <Button icon="read" style={{ border: 'None' }} />
        </Col>
        <Col span={6} type="flex" justify="space-around" align="middle">
          <Button icon="share-alt" style={{ border: 'None' }} />
        </Col>
        <Col span={6} type="flex" justify="space-around" align="middle">
          <Button icon="heart" style={{ border: 'None' }} />
        </Col>
        <Col span={6} type="flex" justify="space-around" align="middle">
          <Button icon="dollar" style={{ border: 'None' }} />
        </Col>
      </Row>
    </div>
  </Card>
  );
};

export default connect(() => ({}), mapDispatchToProps)(FoundationPreview);
