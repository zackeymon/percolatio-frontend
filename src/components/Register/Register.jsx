import { Link } from 'react-router-dom';
import React from 'react';
import agent from 'agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED,
} from 'constants/actionTypes';
import {
  Form, Icon, Input, Button, Typography, Divider,
} from 'antd';

const { Title } = Typography;

const mapStateToProps = (state) => ({ ...state.auth });

const validatePassword = (rule, value, callback) => {
  if (value) {
    if (value.length < 8) {
      callback('Password should be at least 8 characters long');
    }
    callback();
  } else {
    callback();
  }
};

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) => dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: (value) => dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeUsername: (value) => dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload });
  },
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED }),
});

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.submitForm = (email, username, password) => {
      this.props.onSubmit(username, email, password);
    };
    this.state = { screenWidth: null };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.submitForm(values.email, values.username, values.password);
      }
    });
  };

  updateWindowDimensions() {
    this.setState({ screenWidth: window.innerWidth });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const currentWidth = (this.state.screenWidth >= 720) ? '550px' : `${Math.floor(0.75 * this.state.screenWidth)}px`;
    return (
      <div type="flex" justify="center" align="middle" style={{ marginTop: '30px' }}>
        <img
          alt="Percolatio logo"
          src="https://s3.eu-west-2.amazonaws.com/percolation.images/frontend/logo.png"
          height="auto"
          style={{ maxWidth: '200px' }}
        />
        <Title level={4} style={{ color: '#035f66' }} type="secondary">
          Change the world one idea at a time
        </Title>
        <Form
          onSubmit={this.handleSubmit}
          style={{
            maxWidth: currentWidth,
          }}
        >
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
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ margin: 'auto', width: '100%' }}>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your Password',
                },
                { validator: validatePassword },
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ margin: 'auto', width: '100%' }}>
            <Button
              style={{ width: '100%' }}
              type="primary"
              htmlType="submit"
              disabled={this.props.inProgress}
              className="login-form-button"
            >
              Register
            </Button>
            <Divider>or</Divider>
            <Link to="/login">
              <Button
                style={{ width: '100%' }}
                type="link"
              >
                Already have an account? Log in here.
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
