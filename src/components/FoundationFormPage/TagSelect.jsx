import React from 'react';
import { Select } from 'antd';

const tags = ['science', 'oss', 'biotech', 'tech', 'health',
  'ai', 'green', 'women', 'development', 'journalism', 'research'];

const TagSelect = () => (
  <Select
    name="tags"
    mode="tags"
    style={{ width: '100%' }}
    placeholder="E.g. tech, oss or development"
  >
    {tags.map((tag) => (
      <Select.Option key={tag}>{tag}</Select.Option>
    ))}
  </Select>
);

export default TagSelect;
