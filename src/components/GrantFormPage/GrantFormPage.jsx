
import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import {
  Button, Form, Row, Col, Upload, Icon, message,
} from 'antd';
import {
  Select, Input, Radio, InputNumber, Slider, DatePicker, Switch,
} from 'formik-antd';

const { Option } = Select;
const FormItem = Form.Item;
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
    name: Yup.string().required('A name for your foundation is required'),
    description: Yup.string().required('You need to write a few words about your new foundation'),
    website: Yup.string().url('Please provide a valid URL'),
  }),
  mapPropsToValues: (props) => ({
    name: '',
    description: '',
    tags: [],
    existing: '',
    website: '',
    prize: '1000',
    grantees: '1',
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
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: 500, margin: 'auto' }}>
          <fieldset>
            <legend>General</legend>
            <FormItem>
            Name
              <Input
                name="name"
                placeholder="Enter the name of the grant"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name
        && touched.name && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.name}</div>
              )}

            </FormItem>

            <FormItem>
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
            </FormItem>

            <FormItem>
            Which tags describe the grant best?
              <Select
                name="tags"
                mode="tags"
                style={{ width: '100%' }}
                placeholder="E.g. tech, oss or development"
              >
                {tagsChildren}
              </Select>
            </FormItem>

          </fieldset>

          <fieldset>
            <legend>Grant Financials</legend>

            <FormItem>
              <div>
            Is your grant pre-funded (by you or past sponsors) or
            are you planning to raise some funds with your foundation?
              </div>
              <RadioGroup
                name="fundraising"
              >
                <Radio value>Yes</Radio>
                <Radio value={false}>No</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem>
            How many applicants are you planning to award this grant?
              <Row>
                <Col span={12}>
                  <Slider
                    name="grantees"
                    min={1}
                    max={100}

                    onChange={handleChange}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    name="grantees"
                    min={1}
                    max={100}
                    style={{ marginLeft: 16 }}

                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </FormItem>

            <FormItem>
              How much $ each grantee will receive?
              <InputNumber
                name="prize"
                min={0}
                formatter={(value) => `$ ${value}`}
              />
            </FormItem>

            <FormItem>
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
            </FormItem>

          </fieldset>

          <fieldset>
            <legend>Key Dates</legend>
            <FormItem>
              When do you want to start receiving applicants?
              <DatePicker name="start-applications" />
            </FormItem>

            <FormItem>
              When do you want to stop receiving applicants?
              <DatePicker name="stop-applications" />
            </FormItem>

          </fieldset>

          <fieldset>
            <legend>Other</legend>
            <FormItem>
              <div>
              Is there an external website associated with this grant?
              </div>
              <RadioGroup name="existing">

                <Radio value>
                Yes
                  {props.values.existing
                    ? (
                      <Input
                        name="website"
                        placeholder="Type here the grant's website"
                        style={{ width: 250, marginLeft: 10 }}
                      />
                    ) : null}
                </Radio>

                <Radio value={false}>
                  No
                </Radio>
              </RadioGroup>
            </FormItem>

            <FormItem>
            Anything else you would like to add about the details of this grant?
              <Input.TextArea
                name="lastWords"
                placeholder="Here you can add anything that you think it's important but falls outside of the Grant creation form.
                We will try to make the form more customizable, so this is also feedback for us :)"
                rows={6}
              />
              {errors.description
        && touched.description && (
          <div style={{ color: 'red', marginTop: '.5rem' }}>{errors.description}</div>
              )}
            </FormItem>

            <FormItem>
          Is there any support material (e.g. a video or a document) for this grant?
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Dragger>
            </FormItem>
          </fieldset>

          <fieldset>
            <legend>And one last thing</legend>
            <FormItem>
            Have you read the Terms and Conditions of Percolatio:
              <Switch name="consent" />
            </FormItem>
          </fieldset>

          <Button type="primary" disabled={isSubmitting}>
        Create Grant
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

const GrantForm = formikEnhancer(MyForm);

export default GrantForm;
