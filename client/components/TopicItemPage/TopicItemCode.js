import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monoBlue } from 'react-syntax-highlighter/styles/hljs';
import { Tab, Tabs, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MDSpinner from 'react-md-spinner';

// Date:
import colors from '../../../data/colors.json';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 0 }}>
      <SyntaxHighlighter
      language='javascript'
      className="topic-item-code"
      showLineNumbers={true}
      style={monoBlue}
      >
      {props.codeContent}
      </SyntaxHighlighter>
    </Typography>
  );
}

const styles = theme => ({
  tabsIndicator: {
    backgroundColor: '#fff',
  },
});

class TopicItemCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeContent: [],
      value: 0,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event, value) {
    this.setState({ value });
  }

  /**
   * Renders the TopicItemCode component.
   */
  render() {
    return (
      <div>
        <Tabs
          style={{
            backgroundColor: colors[this.props.colorKey],
            color: '#fff',
          }}
          value={this.state.value}
          onChange={this.handleChange}
          classes={{
            indicator: this.props.classes.tabsIndicator
          }}>
          <Tab
            label="Java"
            style={{
              outline: 'none'
            }}
          />
          <Tab
            label="Python"
            style={{
              outline: 'none'
            }}
          />
          <Tab
            label="JavaScript"
            style={{
              outline: 'none'
            }}
          />
        </Tabs>
        {
          <TabContainer codeContent={this.state.codeContent[this.state.value]}/>
        }
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

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(TopicItemCode);
