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
      loading: false,
    };
  }

  componentWillMount() {
    this.props.contentLoaded();

    const sample1 = `// Sample 1 - Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const bucketName = 'Name of a bucket, e.g. my-bucket';
// const filename = 'Local file to upload, e.g. ./local/path/to/file.txt';

// Uploads a local file to the bucket
storage
.bucket(bucketName)
.upload(filename)
.then(() => {
  console.log('filename uploaded to bucket name');
})
.catch(err => {
  console.error('ERROR:', err);
});`;

    const sample2 = `// Sample 2 - Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const bucketName = 'Name of a bucket, e.g. my-bucket';
// const filename = 'Local file to upload, e.g. ./local/path/to/file.txt';

// Uploads a local file to the bucket
storage
.bucket(bucketName)
.upload(filename)
.then(() => {
  console.log('filename uploaded to bucket name');
})
.catch(err => {
  console.error('ERROR:', err);
});`;

    const sample3 = `// Sample 3 - Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const bucketName = 'Name of a bucket, e.g. my-bucket';
// const filename = 'Local file to upload, e.g. ./local/path/to/file.txt';

// Uploads a local file to the bucket
storage
.bucket(bucketName)
.upload(filename)
.then(() => {
  console.log('filename uploaded to bucket name');
})
.catch(err => {
  console.error('ERROR:', err);
});`;

    this.setState({
      loading: true,
      codeContent: [
        sample1,
        sample2,
        sample3
      ]
    });

    setTimeout(() => {
      this.props.contentLoaded();
      this.setState({ loading: false });
    }, 500);
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
          <TabPane tab="Java" key="0">
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
