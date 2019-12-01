
import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import agent from 'agent';

import {
  Select, Input, SubmitButton, ResetButton, Form,
} from 'formik-antd';

const { Option } = Select;

const tags = ['science', 'oss', 'biotech', 'tech', 'health',
  'ai', 'green', 'women', 'development', 'journalism', 'research'];

const tagsChildren = [];

for (let i = 0; i < tags.length; i += 1) {
  tagsChildren.push(<Option key={tags[i]}>{tags[i]}</Option>);
}


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
    name: Yup.string().required('A name for your foundation is required'),
    description: Yup.string().required('You need to write a few words about your new foundation'),
    website: Yup.string().url('Please provide a valid URL'),
  }),
  mapPropsToValues: () => ({
    name: '',
    description: '',
    tags: [],
    website: '',
  }),
  handleSubmit: (values, { setSubmitting }) => {
    agent.Foundations.create(values).then(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      },
    );
    setSubmitting(false);
  },
  displayName: 'Foundation Form',
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
    isSubmitting,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 500, margin: 'auto' }}>

          <Form.Item name="name">
            Name
            <Input
              name="name"
              placeholder="Enter the name of your foundation"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name
        && touched.name && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.name}</div>
            )}

          </Form.Item>

          <Form.Item name="description">
            Describe your foundation in a few words
            <Input.TextArea
              name="description"
              placeholder="Here you can state the goals and purpose of your foundation,
                 the grants you plan to create..."
              rows={6}
            />
            {errors.description
        && touched.description && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.description}</div>
            )}
          </Form.Item>

          <Form.Item name="tags">
            Which tags describe your foundation best?
            <Select
              name="tags"
              mode="tags"
              style={{ width: '100%' }}
              placeholder="E.g. tech, oss or development"
            >
              {tagsChildren}
            </Select>
          </Form.Item>

          <Form.Item name="website">
            (Optional) If you already have a website for the foundation, please provide the URL here
            <Input
              name="website"
              placeholder="http://..."
            />
            {errors.description
        && touched.description && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.description}</div>
            )}
          </Form.Item>

          <SubmitButton type="submit" disabled={isSubmitting}>
        Create Foundation
          </SubmitButton>

          <ResetButton
            type="button"
            className="outline"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
        Reset
          </ResetButton>
          <DisplayFormikState {...props} />

        </div>
      </div>

    </form>
  );
};

const FoundationFormPage = formikEnhancer(MyForm);

export default FoundationFormPage;
