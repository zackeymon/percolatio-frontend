import React from 'react';
import {
  Layout, Row, Col, Avatar, Button, Icon,
} from 'antd';

const {
  Footer, Content,
} = Layout;


const GrantPage = (props) => {
  const { values } = props;

  return (

    <div>
      <Layout>
        <Content>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={7} offset={4}>
              <h1>{props.grant.title}</h1>
            </Col>

            <Col span={6}>
              {' '}
              {<Avatar
                shape="circle"
                size={200}
                icon="user"
              />}
            </Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">

            <Col span={4} offset={4}>
              <Button href="/apply" size="large" type="primary">Apply</Button>
            </Col>

            <Col span={5} offset={1}>
              <Button href="/apply">About this foundation</Button>
            </Col>
          </Row>

          <Row type="flex" justify="space-around" align="middle">
            <Col span={18} offset={5}>
              <h3>
                {' '}
            Short Description of this Grant
              </h3>
              <p>
                {props.grant.description}
              </p>

            </Col>
          </Row>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={11} offset={5}>
              <h5>
            Application Deadline
              </h5>

              <p>
                {props.grant.createdAt}
              </p>

            </Col>
            <Col span={7}>
              <h5>
            Amounts
              </h5>
              <p>250$</p>


            </Col>
          </Row>

          <Row type="flex" justify="space-around" align="middle">
            <Col span={18} offset={5}>
              <h3>
                {' '}
            Full Description
              </h3>
              <p>
                {props.grant.body}
              </p>

            </Col>
          </Row>


          <Row type="flex" justify="space-around" align="middle">
            <ul className="tag-list">
              {
              props.grant.tagList.map((tag) => (
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

          <Row type="flex" justify="space-around" align="middle">
            <Col span={18} offset={5}>
              <h3>
                {' '}
            About this Foundation
              </h3>
              <p>
                {props.grant.founder}
              </p>

            </Col>
          </Row>

        </Content>
        <Footer>
      Made with
          {' '}
          <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
          {' '}
      by Percolatio
        </Footer>
      </Layout>


    </div>
  );
};

export default GrantPage;
