
import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import {
  Button, Form,
} from 'antd';
import {
  Checkbox, Select, Input,
} from 'formik-antd';

const { Option } = Select;
const FormItem = Form.Item;

const genderOptions = ['Female, Male, Other'];


// DisplayFormikState is just here for debugging
const DisplayFormikState = (props) => (
  <div style={{ margin: '1rem 0' }}>
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem',
      }}
    >
      <strong>props</strong>
      {' '}
=
      {' '}
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),
  mapPropsToValues: (props) => ({
    name: '',
    email: '',
    visa: '',
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
      // topics: values.topics.map((t) => t.value),
    };
    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'MyForm',
});

const MyForm = (props) => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 400, margin: 'auto' }}>

          <FormItem>
            <label htmlFor="name" style={{ display: 'block' }}>Name</label>
            <Input
              name="name"
              placeholder="Enter your name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name
        && touched.name && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.name}</div>
            )}

            <label htmlFor="email" style={{ display: 'block' }}>Email</label>
            <Input
              name="email"
              placeholder="Enter your email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email
        && touched.email && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.email}</div>
            )}
          </FormItem>

          <FormItem>
            <Select
              name="topics"
              style={{ width: '100%' }}
              placeholder="What are you doing at the moment?"
              onChange={(value) => {
              // select allows adding an on change handler
              // most components do not yet support this
                console.log('select changed', value);
              }}
            >
              <Option value="student">Student</Option>
              <Option value="full">Full-time employed</Option>
              <Option value="part">Part-time employed</Option>
            </Select>
          </FormItem>

          <FormItem>
            <label>
                  Tell us more about your idea:
              <Input.TextArea name="description" />
            </label>
          </FormItem>

          <FormItem>
            <Select
              title="Gender"
              name="gender"
              options={genderOptions}
              placeholder="Select your Gender"
              handleChange={setFieldValue}
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase()
                .indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="female">Female</Option>
              <Option value="male">Male</Option>
              <Option value="other">Other</Option>
            </Select>
          </FormItem>

          <FormItem>
            <Checkbox name="visa">
                    Visa needed:
            </Checkbox>
          </FormItem>

          <Button type="primary" disabled={isSubmitting}>
        Submit
          </Button>

          <Button
            type="button"
            className="outline"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
        Reset
          </Button>
          <DisplayFormikState {...props} />

        </div>
      </div>

    </form>
  );
};

const ApplicationForm = formikEnhancer(MyForm);

export default ApplicationForm;
