import React from 'react';
import { connect } from 'react-redux';
import {
  Typography, Icon, Col,
} from 'antd';
import './LandingPage.css';

const { Title } = Typography;


class LandingPageCard extends React.Component {
  render() {
    return (
      <Col className="gutter-row" xs={10} sm={10} md={6} lg={10} xl={10}>
        <div className="gutter-box" type="flex" justify="center" align="center">
          <Icon
            style={{ fontSize: '55px', color: this.props.color }}
            type={this.props.icon}
          />
          <Title level={4}>
            {this.props.title}
          </Title>
          <p>
            {this.props.text}
          </p>
        </div>
      </Col>
    );
  }
}

export default connect()(LandingPageCard);
