import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import 'rc-tabs/assets/index.css';

import Markdown from 'components/Markdown';

import { wrapTextIntoMarkdownCodeBlock } from 'utils/markdownUtils';

class TopicItemCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeContent: [],
      error: '',
    };
  }

  componentDidMount() {
    this.getCodeContent(this.props.metaData);
  }

  /**
   * Fetches the code text content from its corresponding resource URL.
   *
   * @param {object} metaData
   */
  getCodeContent = metaData => {
    const promises = [];
    metaData.forEach(codeItem => {
      promises.push(fetch(codeItem.resourceUrl));
    });

    Promise.all(promises)
      .then(result => Promise.all(result.map(x => x.text())))
      .then(result => {
        const codeContent = result.map((codeStr, i) => ({ ...metaData[i], codeStr }));
        this.props.onContentLoaded();
        this.setState({ codeContent });
      })
      .catch(err => this.setState({ error: err }));
  };

  /**
   * Renders the TabPanes based on the codeContent.
   */
  getTabPanes = () => (
    this.state.codeContent.map((codeItem, i) => (
      <TabPane tab={codeItem.title} key={i}>
        <Markdown
          markdownStr={wrapTextIntoMarkdownCodeBlock(codeItem.codeStr, codeItem.language)}
        />
      </TabPane>
    ))
  );

  /**
   * Renders the TopicItemCode component.
   */
  render() {
    if (this.state.error) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Tabs
          defaultActiveKey="0"
          renderTabBar={() => <ScrollableInkTabBar />}
          renderTabContent={() => <TabContent />}
        >
          { this.getTabPanes() }
        </Tabs>
      </div>
    );
  }
}

TopicItemCode.propTypes = {
  onContentLoaded: PropTypes.func,
  metaData: PropTypes.array,
};

export default TopicItemCode;
