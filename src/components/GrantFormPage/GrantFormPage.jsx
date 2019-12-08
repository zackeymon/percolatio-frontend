
import React, { useEffect, useState } from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import agent from 'agent';
import { connect } from 'react-redux';
import {
  GRANT_CREATION_ERROR, GRANT_CREATION_REQUEST, GRANT_CREATION_SUCCESS,
} from 'constants/actionTypes';

import {
  Form, message,
} from 'antd';
import {
  Input, Radio, InputNumber, SubmitButton, ResetButton, Checkbox,
} from 'formik-antd';

import TagSelect from '../TagSelect';


const mapStateToProps = (state) => ({
  isSubmitting: state.grant.isSubmittingForm,
  currentUser: state.common.currentUser,
});

const submitFormActionCreator = (grantParams) => (dispatch) => {
  dispatch({
    type: GRANT_CREATION_REQUEST,
  });
  return agent.Grants.create(grantParams).then(
    ({ grant }) => {
      message.success(`Successfully created grant: ${grant.title}.`);
      dispatch({
        type: GRANT_CREATION_SUCCESS,
      });
    },
    (error) => {
      message.error(`Could not create grant. ${error}.`);
      dispatch({
        type: GRANT_CREATION_ERROR,
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
    title: Yup.string().required('You need to provide a title for your grant'),
    description: Yup.string().required('You need to write a few words about your new grant'),
    externalWebsite: Yup.string().url('This does not seem like a valid URL'),
  }),
  mapPropsToValues: () => ({
    title: '',
    description: '',
    tagList: [],
    allowDonations: true,
    minAmountPerGrantee: 1000,
    otherAwards: '',
    externalWebsite: '',
    otherDetails: '',
    FoundationName: '',
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch(submitFormActionCreator(values));
    setSubmitting(false);
  },
  displayName: 'Grant Form',
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


  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await agent.Foundations.byFounder(props.currentUser.username);
      setData(response);
    };
    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 500, margin: 'auto' }}>
          <fieldset>
            <legend>Create a Grant</legend>
            <Form.Item name="foundationItem">
              Which of your Foundations is issuing the Grant?
              {' '}
              <Radio.Group name="FoundationName" size="large" buttonStyle="solid">
                {data.foundations && data.foundations.map(
                  (foundation) => (
                    <Radio.Button style={{ margin: '2px' }} key={foundation.name} value={foundation.name}>
                      {foundation.name}
                      {' '}
                    </Radio.Button>
                  ),
                )}
              </Radio.Group>

            </Form.Item>

            <Form.Item name="title">
            Name
              <Input
                name="title"
                placeholder="Enter the title of your grant"
                type="text"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.title
        && touched.title && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.title}</div>
              )}

            </Form.Item>

            <Form.Item name="description">
            Describe the grant in a few words
              <Input.TextArea
                name="description"
                placeholder="Here you can state the purpose of the grant, the type of projects which you are willing to fund,
                 and any other relevant information for your grantees..."
                rows={6}
              />
              {errors.description
        && touched.description && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.description}</div>
              )}
            </Form.Item>

            <Form.Item name="tagList">
            Which tags describe the grant best?
              <TagSelect />
            </Form.Item>

          </fieldset>

          <fieldset>
            <legend>Grant Financials</legend>

            <Form.Item name="Donations">
              <Checkbox name="allowDonations">
              Are you accepting donations and sponsors for this grant?
              </Checkbox>
            </Form.Item>

            <Form.Item name="minAmountPerGrantee">
            What is the minimum award a grantee will receive?
              {' '}
              <InputNumber
                name="minAmountPerGrantee"
                min={0}
                formatter={(value) => `$ ${value}`}
              />
            </Form.Item>

            <Form.Item name="otherAwards">
          (Optional) Is there any other non-financial award associated with this grant?

              <Input.TextArea
                name="otherAwards"
                placeholder="Describe any non-financial prizes associated with this grant. "
                rows={5}
              />


            </Form.Item>

          </fieldset>

          <fieldset>
            <legend>Other</legend>
            <Form.Item name="externalWebsite">
             (Optional) If you already have a externalWebsite for the foundation, please provide the URL here
              <Input
                name="externalWebsite"
                placeholder="http://..."
                style={{ width: 250, marginLeft: 10 }}
              />

              {errors.externalWebsite && touched.externalWebsite
              && (<div style={{ color: 'red', marginTop: '.5rem' }}>{errors.externalWebsite}</div>)}


            </Form.Item>

            <Form.Item name="otherDetails">
            Anything else you would like to add about the details of this grant?
              <Input.TextArea
                name="otherDetails"
                placeholder="Here you can add anything that you think it's important but falls outside of the Grant creation form.
                We want to make the form more customizable, so this is also feedback for us :)"
                rows={6}
              />
            </Form.Item>

          </fieldset>


          <SubmitButton style={{ marginRight: '10px' }} type="primary" disabled={isSubmitting}>
        Create Grant
          </SubmitButton>

          {' '}

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

const GrantFormPage = connect(mapStateToProps)(formikEnhancer(MyForm));

export default GrantFormPage;
