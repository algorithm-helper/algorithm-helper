import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import katexOptions from './katexOptions';
import markedOptions from './markedOptions';

class Markdown extends React.Component {
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
   * Renders the Markdown component.
   */
  render() {
    /* eslint-disable react/no-danger */
    return (
      <div className="markdown-container">
        <div dangerouslySetInnerHTML={{ __html: this.state.markdownContent }} />
      </div>
    );
  }
}

Markdown.propTypes = {
  url: PropTypes.string,
  markdownStr: PropTypes.string,
  onLoaded: PropTypes.func,
};

export default Markdown;