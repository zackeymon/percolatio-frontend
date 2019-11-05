
import React from 'react';
import { connect } from 'react-redux';
import agent from 'agent';
import { FOUNDATION_PAGE_LOADED, FOUNDATION_PAGE_UNLOADED } from 'constants/actionTypes';
import {
  Row, Col, Layout, Avatar, Icon,
} from 'antd';

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
            <Row type="flex" justify="space-around" align="middle">
              <Col span={7} offset={4}>
                <h1>{this.props.foundation.name}</h1>
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
              <Col span={18} offset={5}>
                <h3>
                  {' '}
                What do we do?
                </h3>
                <p>
                  {this.props.foundation.description}
                </p>

              </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={11} offset={5}>
                <h5>
                Application Deadline
                </h5>

                <p>
                  {this.props.foundation.createdAt}
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
                  {this.props.foundation.body}
                </p>

              </Col>
            </Row>


            <Row type="flex" justify="space-around" align="middle">
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
            </Row>

            <Row type="flex" justify="space-around" align="middle">
              <Col span={18} offset={5}>
                <h3>
                  {' '}
                About this Foundation
                </h3>
                <p>
                  Name of foundation
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

export default connect(mapStateToProps, mapDispatchToProps)(Foundation);
