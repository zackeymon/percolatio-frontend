
import React from 'react';
import { connect } from 'react-redux';
import agent from 'agent';
import { FOUNDATION_PAGE_LOADED, FOUNDATION_PAGE_UNLOADED } from 'constants/actionTypes';
import {
  Row, Col, Layout, Avatar, Icon, Button,
} from 'antd';
import Donation from './Donation';
import './Foundation.css';


const mapStateToProps = (state) => ({
  ...state.foundation,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: FOUNDATION_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: FOUNDATION_PAGE_UNLOADED }),
});

const {
  Footer, Content,
} = Layout;

class Foundation extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Foundations.get(this.props.match.params.name),
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.foundation) {
      return null;
    }

    return (
      <div>
        <Layout>
          <Content>
            <div className="foundation_header">
              <Row type="flex" justify="space-around" align="middle">
                <Col align="bottom" offset={4} span={7}>
                  <h1 className="foundation_name">{this.props.foundation.name}</h1>
                  <div className="button_donate">
                    <Donation />
                  </div>
                </Col>

                <Col align="center" span={8}>
                  <div className="foundation_avatar">
                    {' '}
                    {<Avatar
                      shape="circle"
                      size={200}
                      icon="user"
                    />}
                  </div>

                </Col>
              </Row>
              <hr className="foundation_header_line" />
            </div>


            <Row type="flex" justify="space-around" align="middle">
              <Col span={18} offset={5}>
                <h3>
                  {' '}
                About
                  {' '}
                  {this.props.foundation.name}
                </h3>
                <p>
                  {this.props.foundation.description}
                </p>

              </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={18} offset={5}>
                <h3>
                Open Grants
                </h3>

                <ol>
                  <li> Grant  1</li>
                  <li> Grant  2</li>
                  <li> Grant  3</li>
                </ol>

              </Col>

            </Row>

            <Row type="flex" justify="space-around" align="middle">
              <Col span={18} offset={5}>
                <h3>
                  {' '}
                Full Description
                </h3>
                <p>
                  {this.props.foundation.body}
                </p>

              </Col>
            </Row>


            <Row type="flex" justify="space-around" align="middle">
              <Col span={18} offset={5}>

                <ul className="tag-list">
                  {
                  this.props.foundation.tagList.map((tag) => (
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
            </Row>

            <Row type="flex" justify="space-around" align="middle">
              <Col span={18} offset={5}>
                <h3>
                  {' '}
                Past awards
                </h3>

                <ol>
                  <li> Grantee  1</li>
                  <li> Grantee  2</li>
                  <li> Grantee  3</li>
                </ol>

              </Col>
            </Row>

          </Content>
        </Layout>


      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Foundation);
