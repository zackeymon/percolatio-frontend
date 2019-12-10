import React from 'react';
import {
  Button, Tabs, Icon, Timeline, Radio,
} from 'antd';

const { TabPane } = Tabs;


const FoundationTab = (props) => {
  const { foundation, grants } = props;

  const operations = (
    <Button href="/new-grant">
      <Icon type="plus" />
      {' '}
      New Grant
    </Button>
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
          <Button href={`/foundation/${foundation.name}`} type="dashed">Visit Foundation profile page</Button>
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

                    <Button href={`/grant/${grant.slug}`} type="dashed">Visit Grant page</Button>
                  </TabPane>
                ),
              )}
      </Tabs>

    </>
  );
};

export default FoundationTab;
