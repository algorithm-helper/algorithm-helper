import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import katexOptions from './katexOptions';
import markedOptions from './markedOptions';
import Markdown from './Markdown';

class MarkdownContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownContent: '',
    };
  }

  componentWillMount() {
    marked.setOptions(markedOptions);

    if (this.props.url) {
      fetch(this.props.url, {
        method: 'GET',
      })
        .then(result => result.text())
        .then(result => {
          this.setState({ markdownContent: marked(result) });

          if (this.props.onLoaded) {
            this.props.onLoaded();
          }
        })
        .catch(() => {});
    } else if (this.props.markdownStr) {
      this.setState({ markdownContent: marked(this.props.markdownStr) });

      if (this.props.onLoaded) {
        this.props.onLoaded();
      }
    }
  }

  componentDidUpdate() {
    window.renderMathInElement(document.body, katexOptions);
  }

  /**
   * Renders the Markdown presentational component.
   */
  render() {
    return (
      <Markdown markdownContent={this.state.markdownContent} />
    );
  }
}

MarkdownContainer.propTypes = {
  url: PropTypes.string,
  markdownStr: PropTypes.string,
  onLoaded: PropTypes.func,
};

export default MarkdownContainer;
