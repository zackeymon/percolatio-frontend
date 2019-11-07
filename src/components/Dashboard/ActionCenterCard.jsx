import React from 'react';
import {
  List, Skeleton, Button, Avatar, Card,
} from 'antd';

const taskList = [
  {
    description: 'The application phase of Great Grant #2 is complete. Please review applicants.',
    type: 'review',
  },
  {
    description: 'Great Grant #3 still requires funding.',
    type: 'funding',
  },
  {
    description: 'Great Grant #4 is not yet created. Finish the form?',
    type: 'form',
  },
];

const iconForTaskType = {
  review: 'idcard',
  funding: 'dollar',
  form: 'edit',
};

const ActionCenterCard = () => (
  <Card title="Action Center">
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      loadMore={<Button onClick={() => { }}>Load more</Button>}
      dataSource={taskList}
      renderItem={(item) => (
        <List.Item
          actions={[<a href="/goSomewhere" key="list-loadmore-edit">Go</a>, <a href="/shouldBeAButton" key="list-loadmore-more">Ignore</a>]}
        >
          <Skeleton avatar title={false} loading={false} active>
            <List.Item.Meta
              avatar={
                <Avatar icon={iconForTaskType[item.type]} theme="twoTone" />
              }
              title={item.type}
              description={item.description}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  </Card>
);

export default ActionCenterCard;
