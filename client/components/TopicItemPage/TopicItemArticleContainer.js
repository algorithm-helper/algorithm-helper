import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import marked from 'marked';
import MDSpinner from 'react-md-spinner';

import Markdown from '../Markdown/';
import getColorFromKey from '../../utils/getColorFromKey';
import getS3ArticleUrl from '../../utils/getS3ArticleUrl';

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
    this.setState({
      loading: true,
      url: getS3ArticleUrl(this.props.match.params),
    });
  }

  /**
   * Handles when the article is finished loading by setting the loading state to false.
   */
  handleLoadedArticle = () => {
    this.setState({ loading: false });
  };

  /**
   * Renders the TopicItemArticleContainer component.
   */
  render() {
    return (
      <div>
        {
          this.state.loading &&
          <div className="topic-item-page-spinner-container">
            <MDSpinner
              size={50}
              singleColor={getColorFromKey(this.props.colorKey)}
            />
          </div>
        }
        <Markdown
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
