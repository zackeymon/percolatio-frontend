
import React from 'react';
import { connect } from 'react-redux';
import agent from 'agent';
import { GRANT_PAGE_LOADED, GRANT_PAGE_UNLOADED } from 'constants/actionTypes';
import {
  Row, Col, Layout, Avatar, Button, Icon,
} from 'antd';
import './Grant.css';

const mapStateToProps = (state) => ({
  ...state.grant,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: GRANT_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: GRANT_PAGE_UNLOADED }),
});

const {
  Footer, Content,
} = Layout;

class Grant extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Grants.get(this.props.match.params.slug),
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.grant) {
      return null;
    }

    return (
      <div>
        <Layout>
          <Content>
            <div className="grant_header">
              <Row type="flex" justify="space-around" align="middle">
                <Col span={7} offset={4}>
                  <h1>{this.props.grant.title}</h1>
                  <div>
                    <Button href="/apply" size="large" type="primary">Apply</Button>

                  </div>
                </Col>

                <Col align="center" span={6}>
                  <div className="foundation_avatar">
                    {' '}
                    {<Avatar
                      shape="circle"
                      size={200}
                      icon="user"
                    />}
                  </div>
                  <div className="button_foundation">
                    <Button href="/apply">About this foundation</Button>
                  </div>

                </Col>
              </Row>

              <hr className="grant_header_line" />


            </div>

            <Row type="flex" justify="space-around" align="middle">
              <Col span={18} offset={5}>
                <h3>
                  {' '}
                About
                  {' '}
                  {this.props.grant.title}
                </h3>
                <p>
                  {this.props.grant.description}
                </p>

              </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={18} offset={5}>
                <h3>
                Key dates
                </h3>

                <p>
                  {this.props.grant.createdAt}
                </p>

              </Col>

            </Row>

            <Row type="flex" justify="space-around" align="middle">


              <Col span={18} offset={5}>
                <h3>
                Amount
                </h3>
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
                  {this.props.grant.body}
                </p>

              </Col>
            </Row>


            <Row type="flex" justify="space-around" align="middle">
              <Col span={18} offset={5}>
                <ul className="tag-list">
                  {
                  this.props.grant.tagList.map((tag) => (
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
                About this Foundation
                </h3>
                <p>
                  {this.props.grant.founder}
                  Lorem ipusm hdfhjkashfkjsdahkfhsdf
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grant);
