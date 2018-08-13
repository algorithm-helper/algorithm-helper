import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

import getColorFromKey from '../../utils/getColorFromKey';

import 'rc-tabs/assets/index.css';

class TopicItemCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeContent: [],
      value: 0,
    };
  }

  componentWillMount() {
    this.props.contentLoaded();
  }

  /**
   * Renders the TopicItemCode component.
   */
  render() {
    return (
      <div>
        <Tabs
          defaultActiveKey="0"
          renderTabBar={() => <ScrollableInkTabBar/>}
          renderTabContent={() => <TabContent/>}>
          <TabPane tab="Java (HashMapLinearProbing)" key="0">
            Test content here
          </TabPane>
          <TabPane tab="Python" key="1">
            Test content here
          </TabPane>
          <TabPane tab="JavaScript" key="2">
            Test content here
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

TopicItemCode.propTypes = {
  contentLoaded: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(TopicItemCode);
