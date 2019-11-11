import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Card, Avatar, Row, Col,
} from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

const mapDispatchToProps = () => ({
  favorite: () => (
    // eslint-disable-next-line no-console
    console.log('fav!')
  ),
});


const GrantPreview = (props) => {
  const { grant } = props;

  const { title, slug, foundation } = grant;

  return (

    <Card
      title={<Link to={`/grant/${grant.slug}`} className="preview-link">{title}</Link>}
      extra={(
        <div>
          <Button href="/apply" type="primary">Apply</Button>
          {' '}

          <Link to={`/grant/${slug}`}>
            <Button>See More</Button>
          </Link>

        </div>
      )}
      style={{ marginTop: '50px' }}
    >
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={5}>
            {<Avatar
              shape="circle"
              size={80}
              icon="user"
            />}
          </Col>
          <Col span={13}>
            <h3 style={{ margin: '5px' }}>
              {`${foundation.name}`}
            </h3>
            <div style={{ margin: '5px' }}>
              {''}
              {`${grant.description}`}
            </div>

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

          </Col>
          <Col span={6}>
            <div style={{ margin: '5px' }}>
              <strong>Deadline:</strong>
              {' '}
              {typeof grant.createdAt}
            </div>
            <div style={{ margin: '5px' }}>
              <strong>Amount:</strong>
              {' '}
              {`${grant.amount}`}
            </div>
          </Col>
        </Row>
      </div>


    </Card>
  );
};

export default connect(() => ({}), mapDispatchToProps)(GrantPreview);
