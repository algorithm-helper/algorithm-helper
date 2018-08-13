import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import marked from 'marked';
import MDSpinner from 'react-md-spinner';

import Markdown from '../Markdown/';
import getColorFromKey from '../../utils/getColorFromKey';
import getS3ArticleUrl from '../../utils/getS3ArticleUrl';

class TopicItemArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };
  }

  componentWillMount() {
    this.setState({ url: getS3ArticleUrl(this.props.match.params) });
  }

  /**
   * Renders the TopicItemArticle component.
   */
  render() {
    return (
      <Markdown
        url={this.state.url}
        onLoaded={this.props.contentLoaded()}
      />
    );
  }
}

TopicItemArticle.propTypes = {
  contentLoaded: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(TopicItemArticle);
