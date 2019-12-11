import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Icon, Typography, Card, Avatar, Row, Col,
} from 'antd';

import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import Jdenticon from 'react-jdenticon';

const { Title, Text } = Typography;
const { Meta } = Card;

const mapDispatchToProps = () => ({
  favorite: () => (
    // eslint-disable-next-line no-console
    console.log('fav!')
  ),
});

const titleCase = (str) => {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
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

const getState = () => {
  const possibleSttes = ['Open to applicants', 'Reviewing applications'];
  return possibleSttes[Math.floor(Math.random() * possibleSttes.length)];
};

const formatDate = (date) => {
  return "March 2019";
}

const GrantPreview = (props) => {
  const { grant } = props;
  console.log(grant);

  const { title, slug, foundation, img } = grant;

  // defaultImage =

  grant.description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa";
  return (
    <Card
      title={(
        <Text>
          &nbsp;
          <Text strong>
            <Avatar style={{ color: '#035f66', backgroundColor: '#cffcee', marginRight: '20px' }}>
              {foundation.founder.username[0].toUpperCase()}
            </Avatar>
            <Link to={`/grant/${grant.slug}`} className="preview-link">
              {foundation.founder.username}
            </Link>
          </Text>
          <Text>
            &nbsp;
            {getAction()}
          </Text>
          &nbsp;
          <Text strong>
            <Link to={`/grant/${grant.slug}`} className="preview-link">
              {title}
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
    >
      <div>
        <Row>
          <Col span={8} type="flex" justify="space-around" align="center">
            <Jdenticon size="80" value={`${foundation.name}`} />
            <div>
              <strong>Created at:</strong>
              {' '}
              {formatDate(grant.createdAt)}
            </div>
            <div>
              <strong>Reward:</strong>
              {' '}
              {`${grant.minAmountPerGrantee}$`}
            </div>
          </Col>
          <Col span={12} type="flex">
            <Row>
              <Link to={`/grant/${grant.slug}`} className="preview-link">
                <Title level={4}>
                  {titleCase(grant.title)}
                </Title>
              </Link>
            </Row>
            <Row>
              <Text>
                {grant.description}
                <Link to={`/grant/${grant.slug}`}>
                  ...
                </Link>
              </Text>
            </Row>
            <Row>
              <ul className="tag-list">
                {
                  grant.tagList.map((tag) => (
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
              This grant is offered by &nbsp;
              {titleCase(foundation.name)}
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

export default connect(() => ({}), mapDispatchToProps)(GrantPreview);
