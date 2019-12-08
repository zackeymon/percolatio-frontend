
import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import agent from 'agent';
import { connect } from 'react-redux';
import { FOUNDATION_CREATION_REQUEST, FOUNDATION_CREATION_SUCCESS, FOUNDATION_CREATION_ERROR } from 'constants/actionTypes';
import { message } from 'antd';

import {
  Input, SubmitButton, ResetButton, Form,
} from 'formik-antd';

import TagSelect from '../TagSelect';

const mapStateToProps = (state) => ({
  isSubmitting: state.foundation.isSubmittingForm,
});

const submitFormActionCreator = (foundationParams) => (dispatch) => {
  dispatch({
    type: FOUNDATION_CREATION_REQUEST,
  });
  return agent.Foundations.create(foundationParams).then(
    ({ foundation }) => {
      message.success(`Successfully created foundation: ${foundation.name}.`);
      dispatch({
        type: FOUNDATION_CREATION_SUCCESS,
      });
    },
    (error) => {
      message.error(`Could not create foundation. ${error}`);
      dispatch({
        type: FOUNDATION_CREATION_ERROR,
      });
    },
  );
};

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
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(submitFormActionCreator(values));
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

          <Form.Item name="foundationItem">
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

          <Form.Item name="descriptionItem">
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

          <Form.Item name="tagsItem">
            Which tags describe your foundation best?
            <TagSelect name="tags" />
          </Form.Item>

          <Form.Item name="websiteItem">
            (Optional) If you already have a website for the foundation, please provide the URL here
            <Input
              name="website"
              placeholder="http://..."
            />
            {errors.website
        && touched.website && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.website}</div>
            )}
          </Form.Item>

          <SubmitButton style={{ marginRight: '10px' }} type="primary" disabled={isSubmitting}>
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

const FoundationFormPage = connect(mapStateToProps)(formikEnhancer(MyForm));

export default FoundationFormPage;
