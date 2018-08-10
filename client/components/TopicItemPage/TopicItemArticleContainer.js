import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import marked from 'marked';
import MDSpinner from 'react-md-spinner';

import MarkdownContainer from '../MarkdownContainer/';
import getColorFromKey from '../../utils/getColorFromKey';

const S3_URL_PREFIX = 'https://s3.amazonaws.com/algorithm-helper/content/categories';

class TopicItemArticleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      contentFormatted: '',
      url: '',
    };
  }

  componentWillMount() {
    const { categoryKey, subcategoryKey, topicKey } = this.props.match.params;
    const url = `${S3_URL_PREFIX}/${categoryKey}/${subcategoryKey}/${topicKey}.md`;
    this.setState({ loading: true, url });
  }

  handleLoadedArticle = () => {
    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        {
          this.state.loading &&
          <div className="dynamic-content-page-loader">
            <MDSpinner
              size={50}
              singleColor={getColorFromKey(this.props.colorKey)}
            />
          </div>
        }
        <MarkdownContainer
          url={this.state.url}
          onLoaded={this.handleLoadedArticle}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(TopicItemArticleContainer);
