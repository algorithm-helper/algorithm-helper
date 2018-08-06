import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import marked from 'marked';
import MDSpinner from 'react-md-spinner';

import colors from '../../../data/colors.json';

const S3_URL_PREFIX = 'https://s3.amazonaws.com/algorithm-helper/content/categories';

class TopicItemArticleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      contentFormatted: '',
    };
  }

  componentWillMount() {
    this.setState({ loading: true });

    const { categoryKey, subcategoryKey, topicKey } = this.props.match.params;
    const s3Url = `${S3_URL_PREFIX}/${categoryKey}/${subcategoryKey}/${topicKey}.md`;
    fetch(s3Url)
    .then(res => res.text())
    .then(res => {
      this.setState({ contentFormatted: marked(res) });

      setTimeout(() => {
        this.props.contentLoaded();
        this.setState({ loading: false });
      }, 500);
    })
    .catch(err => {});
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
            <div dangerouslySetInnerHTML={{__html: this.state.contentFormatted}} />
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
