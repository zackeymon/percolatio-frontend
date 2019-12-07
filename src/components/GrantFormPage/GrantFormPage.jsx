
import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import agent from 'agent';

import {
  Form, Row, Col, Upload, Icon, message,
} from 'antd';
import {
  Select, Input, Radio, InputNumber, SubmitButton, ResetButton, Switch,
} from 'formik-antd';

const { Option } = Select;
const RadioGroup = Radio.Group;
const { Dragger } = Upload;

const tags = ['science', 'oss', 'biotech', 'tech', 'health',
  'ai', 'green', 'women', 'development', 'journalism', 'research'];

const tagsChildren = [];

for (let i = 0; i < tags.length; i += 1) {
  tagsChildren.push(<Option key={tags[i]}>{tags[i]}</Option>);
}


const uploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
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
    title: Yup.string().required('A name for your foundation is required'),
    description: Yup.string().required('You need to write a few words about your new foundation'),
    website: Yup.string().url('Please provide a valid URL'),
  }),
  mapPropsToValues: () => ({
    title: '',
    description: '',
    tags: [],
    existing: '',
    website: '',
    prize: '1000',
  }),
  handleSubmit: (values, { setSubmitting }) => {
    agent.Grants.create(values).then(
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
          <fieldset>
            <legend>General</legend>
            <Form.Item name="title">
            Name
              <Input
                name="title"
                placeholder="Enter the title of your grant"
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

            <Form.Item name="tags">
            Which tags describe the grant best?
              <Select
                name="tags"
                mode="tags"
                style={{ width: '100%' }}
                placeholder="E.g. tech, oss or development"
              >
                {tagsChildren}
              </Select>
            </Form.Item>

          </fieldset>

          <fieldset>
            <legend>Grant Financials</legend>

            <Form.Item name="accept-donations">
              <div>
              Are you accepting donations and sponsors for this grant?
              </div>
              <RadioGroup
                name="fundraising"
              >
                <Radio value>Yes</Radio>
                <Radio value={false}>No</Radio>
              </RadioGroup>
            </Form.Item>

            <Form.Item name="min-amount">
            What is the minimum $ award a grantee will receive?
              <InputNumber
                name="prize"
                min={0}
                formatter={(value) => `$ ${value}`}
              />
            </Form.Item>

            <Form.Item name="other-awards">
          Is there any other non-financial award associated with this grant?
              <RadioGroup name="nonFinancial">

                <Radio value>
                Yes

                </Radio>

                <Radio value={false}>
                No
                </Radio>
                <div>
                  {props.values.nonFinancial
                    ? (

                      <Input.TextArea
                        name="otherAward"
                        placeholder="Describe any non-financial prizes associated with this grant. "
                        rows={5}
                      />


                    ) : null}
                </div>
              </RadioGroup>
            </Form.Item>

          </fieldset>

          <fieldset>
            <legend>Other</legend>
            <Form.Item name="website">
             (Optional) If you already have a website for the foundation, please provide the URL here
              <Input
                name="website"
                placeholder="http://..."
                style={{ width: 250, marginLeft: 10 }}
              />

              {errors.description && errors.touched
              && (<div style={{ color: 'red', marginTop: '.5rem' }}>{errors.description}</div>)}


            </Form.Item>

            <Form.Item name="other-details">
            Anything else you would like to add about the details of this grant?
              <Input.TextArea
                name="lastWords"
                placeholder="Here you can add anything that you think it's important but falls outside of the Grant creation form.
                We want to make the form more customizable, so this is also feedback for us :)"
                rows={6}
              />
              {errors.description
        && touched.description && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.description}</div>
              )}
            </Form.Item>

            <Form.Item>
          Is there any support material (e.g. a video or a document) for this grant?
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Dragger>
            </Form.Item>
          </fieldset>

          <fieldset>
            <legend>And one last thing</legend>
            <Form.Item>
            Have you read the Terms and Conditions of Percolatio:
              {' '}
              <Switch name="consent" />
            </Form.Item>
          </fieldset>

          <SubmitButton type="submit" disabled={isSubmitting}>
        Create Grant
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

const GrantForm = formikEnhancer(MyForm);

export default GrantForm;
