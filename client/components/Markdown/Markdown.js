import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import katexSettings from './katexSettings';
import markedSettings from './markedSettings';

class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownContent: '',
    };
  }

  componentWillMount() {
    marked.setOptions(markedSettings);

    fetch(this.props.url, {
      method: 'GET'
    })
    .then(result => result.text())
    .then(result => {
      this.setState({ markdownContent: marked(result) });
    })
    .catch(() => {});
  }

  componentDidUpdate() {
    window.renderMathInElement(document.body, katexSettings);
  }

  render() {
    return (
      <div className="markdown-container">
        <div dangerouslySetInnerHTML={{ __html: this.state.markdownContent }}/>
      </div>
    );
  }
}

Markdown.propTypes = {
  url: PropTypes.string,
  onLoaded: PropTypes.func,
};

export default Markdown;
