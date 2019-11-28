import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from 'constants/actionTypes';
import {
  Typography, message, Layout, Row, Col, Input, Icon,
} from 'antd';
import isEmail from 'validator/lib/isEmail';
import jsonp from 'jsonp';

import NavBar from '../Navbar/index';
import './LandingPage.css';
import LandingPageCard from './LandingPageCard';

const queryString = require('query-string');
const landingPageStrings = require('./texts.json');

const { Search } = Input;
const { Content, Footer } = Layout;
const { Title } = Typography;

const mailChimpUrl = 'https://percolatio.us4.list-manage.com/subscribe/post?u=82878581fd55df99ab90459cd&id=bcfd1d6c1f';
const getAjaxUrl = (url) => url.replace('/post?', '/post-json?');

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

const subscribe = (data) => {
  if (!isEmail(data)) {
    message.error('The email address provided does not seem to be valid');
    return;
  }
  const params = queryString.stringify({
    EMAIL: data,
  });
  const url = `${getAjaxUrl(mailChimpUrl)}&${params}`;

  jsonp(
    url,
    {
      param: 'c',
    },
    (err, d) => {
      if (err) {
        message.warn('Something went wrong. Please try again in a bit.');
      } else if (d.result !== 'success') {
        if (d.msg.includes('already subscribed')) {
          message.warn('It seems like you are already part of our newsletter');
        } else {
          message.warn('Something went wrong. Please try again in a bit.');
        }
      } else {
        message.info('Thank you!. We will stay in touch');
      }
    },
  );
};

class LandingPage extends React.Component {
  componentWillMount() { }

  componentWillReceiveProps() { }

  render() {
    return (
      <Layout class="open-sans-font" style={{ backgroundColor: 'white' }}>
        <NavBar />
        <Content style={{ paddingTop: 30, paddingLeft: 30, paddingRight: 30 }}>

          <Row type="flex" style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
            <Col offset={1}>
              <Title level={1}>{landingPageStrings.en.Title}</Title>
              <Title level={3}>{landingPageStrings.en.Subtitle}</Title>
              <p>
                {landingPageStrings.en.Subscribe.Title}
              </p>
              <Search
                placeholder={landingPageStrings.en.Subscribe.Placeholder}
                enterButton={landingPageStrings.en.Subscribe.ButtonText}
                onSearch={subscribe}
                style={{ width: 300 }}
              />
            </Col>
            <Col offset={1} span={7}>
              <img
                alt="Percolatio logo"
                src="https://s3.eu-west-2.amazonaws.com/percolation.images/frontend/logo.png"
                height="auto"
                width="70%"
              />
            </Col>
          </Row>
          <div style={{ "padding": '50px' }}>
            <Row type="flex" justify="space-around" align="middle">
              <Title level={2}>
                {landingPageStrings.en.HowItWorks.Title}
              </Title>
            </Row>

            <Row paddingBottom={8} type="flex" justify="space-around" align="middle">
              {landingPageStrings.en.HowItWorks.Subtitle}
            </Row>
          </div>

          <Row type="flex" justify="center" align="top" style={{ margin: '10px 10px' }}>
            <LandingPageCard
              title={landingPageStrings.en.HowItWorks.Step1.Title}
              text={landingPageStrings.en.HowItWorks.Step1.Text}
              color="#007687ff"
              icon="rocket"
            />
            <LandingPageCard
              title={landingPageStrings.en.HowItWorks.Step2.Title}
              text={landingPageStrings.en.HowItWorks.Step2.Text}
              color="#007687ff"
              icon="audit"
            />
            <LandingPageCard
              title={landingPageStrings.en.HowItWorks.Step3.Title}
              text={landingPageStrings.en.HowItWorks.Step3.Text}
              color="#1DA1F2"
              icon="twitter"
            />
            <LandingPageCard
              title={landingPageStrings.en.HowItWorks.Step4.Title}
              text={landingPageStrings.en.HowItWorks.Step4.Text}
              color="#00d894ff"
              icon="bulb"
            />
          </Row>

        </Content>
        <Footer style={{ 'textAlign': 'center', position: "sticky", bottom: "0", 'backgroundColor': 'white' }}>
          Made with
          <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
          {' '}
          by Percolatio.
                   Follow us on
          <a href="https://twitter.com/percolatio"> <Icon type="twitter" /></a>
        </Footer>

      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
