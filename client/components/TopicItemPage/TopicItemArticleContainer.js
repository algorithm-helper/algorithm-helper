import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import marked from 'marked';
import MDSpinner from 'react-md-spinner';

import MarkdownContainer from '../MarkdownContainer/';
import colors from '../../../data/colors.json';

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
    // this.setState({ loading: true });
    const { categoryKey, subcategoryKey, topicKey } = this.props.match.params;
    const url = `${S3_URL_PREFIX}/${categoryKey}/${subcategoryKey}/${topicKey}.md`;
    this.setState({ url });
  }

  render() {
    return (
      <div>
        {
          this.state.loading ?
          (
            <div className="dynamic-content-page-loader">
              <MDSpinner
                size={50}
                singleColor={colors[this.props.colorKey]}
              />
            </div>
          ) :
          (
            <MarkdownContainer
              url={this.state.url}
            />
          )
        }
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

// <div dangerouslySetInnerHTML={{__html: this.state.contentFormatted}} />
