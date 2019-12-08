import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from 'constants/actionTypes';
import {
  Typography, message, Layout, Row, Input, Icon,
} from 'antd';
import isEmail from 'validator/lib/isEmail';
import jsonp from 'jsonp';

import NavBar from '../Navbar/index';
import './LandingPage.css';

const queryString = require('query-string');
const landingPageStrings = require('./texts.json');

const { Search } = Input;
const { Content, Footer } = Layout;
const { Title, Text } = Typography;

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
    const isMobile = (window.innerWidth < 720);
    const imageScale = (isMobile) ? '90%' : '30%';
    const buttonWidth = (isMobile) ? `${Math.floor(0.75 * window.innerWidth)}px` : '400px';
    return (
      <Layout class="open-sans-font" style={{ backgroundColor: 'white' }}>
        <NavBar />
        <Content style={{ paddingTop: 30, paddingLeft: 30, paddingRight: 30 }}>
          <Row type="flex" justify="space-around" align="middle">
            <div type="flex" justify="space-around" align="middle">
              <img
                alt="Percolatio logo"
                src="https://s3.eu-west-2.amazonaws.com/percolation.images/frontend/logoName.png"
                height="auto"
                width={imageScale}
                style={{
                  zIndex: '-1',
                }}
              />
              <Title level={2}>{landingPageStrings.en.Subtitle}</Title>
              <Title level={4}>
                Sponsor change - Build a community -
                Promote talent - Get funding
              </Title>
              <div style={{ marginTop: (isMobile) ? '20px' : '60px' }}>
                <Text type="secondary">
                  {landingPageStrings.en.Subscribe.Title}
                </Text>
              </div>
              <div style={{ marginTop: '15px', marginBottom: '20px' }}>
                <Search
                  placeholder={landingPageStrings.en.Subscribe.Placeholder}
                  enterButton={landingPageStrings.en.Subscribe.ButtonText}
                  onSearch={subscribe}
                  style={{ width: buttonWidth }}
                />
              </div>
            </div>
          </Row>
        </Content>
        <Footer style={{
          textAlign: 'center',
          position: 'absolute',
          bottom: '0',
          backgroundColor: 'white',
        }}
        >
          Made with
          <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
          {' '}
          by Percolatio.
                   Follow us on
          <a href="https://twitter.com/percolatio">
            <Icon type="twitter" />
          </a>
        </Footer>

      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
