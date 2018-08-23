import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

import Markdown from '../Markdown/';

import getColorFromKey from '../../utils/getColorFromKey';
import { wrapTextIntoMarkdownCodeBlock } from '../../utils/markdownUtils';

import 'rc-tabs/assets/index.css';

class TopicItemCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeContent: [],
      value: 0,
      metaData: [],
      error: '',
    };
  }

  componentWillMount() {
    this.setState({ error: '' });
    this.props.contentLoaded();
    this.setState({ metaData: this.props.metaData });
    this.getCodeContent();
  }

  /**
   * Fetches the code text content from its corresponding resource URL.
   */
  getCodeContent = () => {
    const promises = [];
    const metaData = this.props.metaData;
    metaData.forEach(codeItem => {
      promises.push(fetch(codeItem.resourceUrl));
    });

    Promise.all(promises)
    .then(result => Promise.all(result.map(x => x.text())))
    .then(result => {
      const codeContent = result.map((codeStr, i) => ({ ...metaData[i], codeStr }));
      this.setState({ codeContent });
    })
    .catch(err => this.setState({ error: err }));
  };

  /**
   * Renders the TabPanes based on the codeContent.
   */
  getTabPanes = () => {
    return this.state.codeContent.map((codeItem, i) => {
      return (
        <TabPane tab={codeItem.title} key={i}>
          <Markdown
            markdownStr={wrapTextIntoMarkdownCodeBlock(codeItem.codeStr, codeItem.language)}
          />
        </TabPane>
      );
    });
  };

  /**
   * Renders the TopicItemCode component.
   */
  render() {
    if (this.state.error) {
      return <Redirect to={'/'} />;
    }

    return (
      <div>
        <Tabs
          defaultActiveKey="0"
          renderTabBar={() => <ScrollableInkTabBar/>}
          renderTabContent={() => <TabContent/>}>
          { this.getTabPanes() }
        </Tabs>
      </div>
    );
  }
}

TopicItemCode.propTypes = {
  contentLoaded: PropTypes.func.isRequired,
  metaData: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(TopicItemCode);
