import React from 'react';
import { Layout, Row, Col } from 'antd';
import GrantDetail from './GrantDetail';

const {
  Footer, Content,
} = Layout;


const GrantPage = (props) => {
  const { values } = props;

  return (

    <div>
      <Layout>
        <Content>
          <Row>
            <Col span={12}>Title, fav</Col>
            <Col span={12}>Foundation Logo</Col>
          </Row>
          <Row>
            <Col span={12}>apply</Col>
            <Col span={12}>Tags</Col>
          </Row>
          <Row>
            <Col span={24}>Short Description</Col>
          </Row>
          <Row>
            <Col span={12}>Key Dates</Col>
            <Col span={12}>Amounts</Col>
          </Row>
          <Row>
            <Col span={24}>Longer Description</Col>
          </Row>
          <Row>
            <Col span={24}>About the Foundation</Col>
          </Row>
        </Content>
        <Footer>Footer</Footer>
      </Layout>

    </div>

  );
};

export default GrantPage;
