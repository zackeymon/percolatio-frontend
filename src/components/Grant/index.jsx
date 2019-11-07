
import React from 'react';
import { connect } from 'react-redux';
import agent from 'agent';
import { GRANT_PAGE_LOADED, GRANT_PAGE_UNLOADED } from 'constants/actionTypes';
import {
  Row, Col, Layout, Avatar, Button, Icon,
} from 'antd';

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
            <Row type="flex" justify="space-around" align="middle">
              <Col span={7} offset={4}>
                <h1>{this.props.grant.title}</h1>
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
                  {this.props.grant.description}
                </p>

              </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={11} offset={5}>
                <h5>
                Application Deadline
                </h5>

                <p>
                  {this.props.grant.createdAt}
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
                  {this.props.grant.body}
                </p>

              </Col>
            </Row>


            <Row type="flex" justify="space-around" align="middle">
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
            </Row>

            <Row type="flex" justify="space-around" align="middle">
              <Col span={18} offset={5}>
                <h3>
                  {' '}
                About this Foundation
                </h3>
                <p>
                  {this.props.grant.founder}
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
