import React from 'react';
import { Carousel, Card, Typography } from 'antd';
import './Applicants.css';

const { Title } = Typography;

function onChange(a, b, c) {
  console.log(a, b, c);
}

const Applicants = () => (
  <div style={{ margin: '15px' }}>
    <h5>Review Applications</h5>
    <Carousel afterChange={onChange}>
      <div>
        <Card
          title="Jon Doe - Pink Rocket"
          extra={<a href="#">Review</a>}
          style={{ width: 300 }}
        >
          <p>Application content</p>
          <p>Application content</p>
          <p>Application content</p>
          <p>Application content</p>
        </Card>
      </div>
      <div>
        <Card
          title="Alice - Psycho Maze"
          extra={<a href="#">Review</a>}
          style={{ width: 300 }}
        >
          <p>Application content</p>
          <p>Application content</p>
          <p>Application content</p>
          <p>Application content</p>
        </Card>
      </div>
      <div>
        <Card
          title="Bob - Green Index Fund"
          extra={<a href="#">Review</a>}
          style={{ width: 300 }}
        >
          <p>Application content</p>
          <p>Application content</p>
          <p>Application content</p>
          <p>Application content</p>
        </Card>
      </div>
      <div>
        <Card
          title="Eve - Evil weapon"
          extra={<a href="#">Review</a>}
          style={{ width: 300 }}
        >
          <p>Application content</p>
          <p>Application content</p>
          <p>Application content</p>
          <p>Application content</p>
        </Card>
      </div>
    </Carousel>
  </div>
);

export default Applicants;
