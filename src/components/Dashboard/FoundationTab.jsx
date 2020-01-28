import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Tabs, Icon, Timeline, Radio,
} from 'antd';

const { TabPane } = Tabs;


const FoundationTab = (props) => {
  const { foundation, grants } = props;

  const operations = (
    <Link to="/new-grant">
      <Button>
        <Icon type="plus" />
        {' '}
      New Grant
      </Button>
    </Link>
  );

  function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
  }

  return (
    <>

      <h2 style={{ margin: '10px' }}>{foundation.name}</h2>

      <Tabs defaultActiveKey="overview" tabBarExtraContent={operations} tabPosition="left">
        <TabPane tab="Overview" key="overview">
          <p>{foundation.description}</p>
          <p>{foundation.website}</p>
          <Link to={`/foundation/${foundation.name}`}>
            <Button type="dashed">Visit Foundation profile page</Button>
          </Link>
        </TabPane>
        {grants
              && grants.map(
                (grant) => (
                  <TabPane tab={grant.title} key={grant.title}>
                    <div style={{ margin: '10px' }}>
                      Description:
                      {' '}
                      {grant.description}
                    </div>
                    <div style={{ margin: '10px' }}>
                      Minimum Amount per Grantee:
                      {' '}
                      {grant.minAmountPerGrantee}
                    </div>
                    <div style={{ margin: '10px' }}>
                      Other Awards:
                      {' '}
                      {grant.otherAwards}
                    </div>
                    <h4 style={{ margin: '10px' }}> Timeline </h4>
                    <Timeline>
                      <Timeline.Item>
                       Grant created on the
                        {' '}
                        {grant.createdAt}
                      </Timeline.Item>
                      <Timeline.Item color="green">Fundraising expected to finish on...</Timeline.Item>
                    </Timeline>

                    <h4 style={{ margin: '10px' }}> State of the Grant </h4>
                    <div style={{ margin: '10px' }}>
                      <Radio.Group onChange={onChange} defaultValue={1}>
                        <Radio.Button value={1}>Fundraising</Radio.Button>
                        <Radio.Button value={2}>Applications</Radio.Button>
                        <Radio.Button value={3} disabled>Deliberation</Radio.Button>
                        <Radio.Button value={4} disabled>Awards</Radio.Button>
                        <Radio.Button value={5} disabled>Closed</Radio.Button>
                      </Radio.Group>
                    </div>

                    <Link to={`/grant/${grant.slug}`}>
                      <Button type="dashed">Visit Grant page</Button>
                    </Link>
                  </TabPane>
                ),
              )}
      </Tabs>

    </>
  );
};

export default FoundationTab;
