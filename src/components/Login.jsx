import { Link } from 'react-router-dom';
import React from 'react';
import agent from 'agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
} from 'constants/actionTypes';
import {
  Form, Icon, Input, Button, Checkbox, Typography, Divider,
} from 'antd';

const { Title } = Typography;
const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) => dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: (value) => dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) => dispatch({
    type: LOGIN,
    payload: agent.Auth.login(email, password),
  }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
});

class LoginForm extends React.Component {
  constructor() {
    super();
    this.submitForm = (email, password) => {
      this.props.onSubmit(email, password);
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.submitForm(values.email, values.password);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div type="flex" justify="center" align="middle" style={{ marginTop: '30px' }}>
        <img
          alt="Percolatio logo"
          src="https://s3.eu-west-2.amazonaws.com/percolation.images/frontend/logo.png"
          height="auto"
          style={{ maxWidth: '200px' }}
        />
        <Title level={4} style={{ color: '#035f66' }} type="secondary">You don't have to be a millionaire to change the world</Title>
        <Form onSubmit={this.handleSubmit} className="login-form" style={{ maxWidth: '500px' }}>
          <Form.Item style={{ margin: 'auto', width: '100%' }}>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email',
                message: 'The input is not valid email!',
              }, { required: true, message: 'Please input your email!' }],
            })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ margin: 'auto', width: '100%' }}>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your Password',
                }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ margin: 'auto', width: '100%' }}>
            {/* {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox style={{ float: 'left', marginLeft: '7px' }}>Remember me</Checkbox>)} */}
            {/* <a style={{ float: 'right', marginRight: '7px' }} className="login-form-forgot">
              Forgot password
            </a> */}
            <Button
              style={{ width: '100%' }}
              type="primary"
              htmlType="submit"
              disabled={this.props.inProgress}
              className="login-form-button"
            >
              Log in
            </Button>
            <Divider>or</Divider>
            <Link to="/register">
              <Button
                style={{ width: '50%' }}
                type="link"
              >
                New to Percolatio? Sign up here!
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
