import agent from 'agent';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from 'constants/actionTypes';
import { Typography } from 'antd';

import { message, Layout, List, Button, Menu } from 'antd';
import { Card, Icon, Avatar } from 'antd';
import { Row, Col } from 'antd';
import { Input } from 'antd';
import NavBar from '../Navbar/index'
import isEmail from 'validator/lib/isEmail';

import './LandingPage.css';

const queryString = require('query-string');

const { Search } = Input;
const { Content } = Layout;
const { Title } = Typography;

const mailChimpUrl = "https://gmail.us20.list-manage.com/subscribe/post?u=6ab97c6731c30a65057839edf&id=7b65cebef7"
const getAjaxUrl = mailChimpUrl => mailChimpUrl.replace("/post?", "/post-json?");
const request = require('request');

const mapStateToProps = (state) => ({
  appName: state.common.appName,
});


const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) => dispatch({
    type: APP_LOAD, payload, token, skipTracking: true,
  }),
  onRedirect: () => dispatch({
    type: REDIRECT,
  }),
});

const subscribe = data => {

  if (!isEmail(data)) {
    message.error('The email address provided does not seem valid');
    return
  }
  const params = queryString.stringify(data);
  const url = getAjaxUrl(mailChimpUrl) + "&" + params;

  request.post(url,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        message.info('Thank you, we will stay in touch');
      }
    });
};

class LandingPage extends React.Component {
  componentWillMount() { }

  componentWillReceiveProps(nextProps) { }

  render() {
    return (
      <Layout>
        <NavBar></NavBar>
        <Content>
          <div style={{ backgroundColor: 'white', paddingTop: 20 }}>

            <Row type="flex" style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
              <Col span={8}>
                <Title level={1}>Percolatio</Title>
                <Title level={3}>The platform for seed stage philanthropy.</Title>
                <p>
                  Subscribe to our newsletter to stay updated and get early access to our private beta.
                </p>
                <Search
                  placeholder="Your email"
                  enterButton="Subscribe"
                  onSearch={subscribe}
                />
              </Col>
              <Col span={8}>
                <img alt="Percolatio logo" src='https://s3.eu-west-2.amazonaws.com/percolation.images/frontend/logo.png' />
              </Col>
            </Row>

            <Row type="flex" justify="space-around" align="middle">
              <Title level={2}>How does it work?</Title>
            </Row>

            <Row type="flex" justify="space-around" align="middle">
              <p>You dont have to be a millionaire or leave your job to become a philanthropist.</p>
            </Row>

            <Row gutter={16} type="flex" justify="space-around" align="middle">
              <Col className="gutter-row" span={6}>
                <div className="gutter-box" type="flex" justify="space-around" align="middle">
                  <Icon style={{ fontSize: '55px', color: '#007687ff' }} type="rocket" />
                  <Title level={4}>Step 1: Setup a Foundation</Title>
                  <p>elit at imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean et tortor at risus.</p>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box" type="flex" justify="space-around" align="middle">
                  <Icon style={{ fontSize: '55px' }} type="audit" />
                  <Title level={4}>Step 2: Create a Grant</Title>
                  <p> elit at imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean et tortor at risus.</p>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box" type="flex" justify="space-around" align="middle">
                  <Icon style={{ fontSize: '55px', color: '#1DA1F2' }} type="twitter" />
                  <Title level={4}>Step 3: Share it on Social Media</Title>
                  <p>elit at imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean et tortor at risus</p>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div className="gutter-box" type="flex" justify="space-around" align="middle">
                  <Icon style={{ fontSize: '55px', color: '#00d894ff' }} type="bulb" />
                  <Title level={4}>Step 4: Ideas</Title>
                  <p>elit at imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean et tortor at risus</p>
                </div>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
