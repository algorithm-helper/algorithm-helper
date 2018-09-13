import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'components/Markdown';
import Redirect from 'react-router-dom/Redirect';

class TopicItemArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleContent: '',
      error: '',
    };
  }

  componentDidMount() {
    this.props.onContentLoaded();
    this.getArticleContent();
  }

  /**
   * Fetches the article text content from its corresponding resource URL.
   */
  getArticleContent = () => {
    if (!this.props.articleUrl) {
      this.setState({ error: true });
      return;
    }

    fetch(this.props.articleUrl)
      .then(result => result.text())
      .then(result => this.setState({ articleContent: result }))
      .catch(error => this.setState({ error }));
  };

  /**
   * Renders the TopicItemArticle component.
   */
  render() {
    if (this.state.error) {
      return <Redirect to="/" />;
    }

    return (
      <Markdown markdownStr={this.state.articleContent} />
    );
  }
}

TopicItemArticle.propTypes = {
  articleUrl: PropTypes.string,
  onContentLoaded: PropTypes.func,
};

export default TopicItemArticle;
