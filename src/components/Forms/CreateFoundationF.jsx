
import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import {
  Button, Form,
} from 'antd';
import {
  Select, Input, Radio,
} from 'formik-antd';

const { Option } = Select;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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
  mapPropsToValues: (props) => ({
    name: '',
    description: '',
    tags: [],
    existing: '',
    website: '',
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

          <FormItem>
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

          </FormItem>

          <FormItem>
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
          </FormItem>

          <FormItem>
            Which tags describe your foundation best?
            <Select
              name="tags"
              mode="tags"
              style={{ width: '100%' }}
              placeholder="E.g. tech, oss or development"
            >
              {tagsChildren}
            </Select>
          </FormItem>

          <FormItem>
          Are you creating a profile in Percolatio for an existing foundation?
            <RadioGroup name="existing">
              <Radio value="No">
                No
              </Radio>

              <Radio value="Yes">
                Yes
                {props.values.existing === 'Yes'
                  ? (
                    <Input
                      name="website"
                      placeholder="Type your foundation's URL here"
                      style={{ width: 250, marginLeft: 10 }}
                    />
                  ) : null}
              </Radio>
            </RadioGroup>
          </FormItem>

          <Button type="primary" disabled={isSubmitting}>
        Create Foundation
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

const FoundationForm = formikEnhancer(MyForm);

export default FoundationForm;
