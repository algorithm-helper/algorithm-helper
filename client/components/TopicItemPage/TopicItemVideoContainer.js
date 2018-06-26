import React from 'react';
import { connect } from 'react-redux';
import MDSpinner from 'react-md-spinner';

// Data:
import colors from '../../../data/colors.json';

class TopicItemVideoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this.handleIFrameLoad = this.handleIFrameLoad.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: true });
  }

  handleIFrameLoad() {
    this.props.contentLoaded();
    this.setState({ loading: false });
  }

  render() {
    // TODO - this.props.videoSrc
    const videoSrc = 'https://www.youtube.com/embed/-QNLyGqWx0I';

    return (
      <div>
        {
          this.state.loading &&
          (
            <div className="dynamic-content-page-loader">
              <MDSpinner
                size={50}
                singleColor={colors[this.props.colorKey]}
              />
            </div>
          )
        }
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            style={{
              display: this.state.loading ? 'none' : 'block'
            }}
            className="embed-responsive-item"
            src={videoSrc}
            frameBorder="0"
            allowFullScreen
            onLoad={this.handleIFrameLoad}
          >
          </iframe>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(TopicItemVideoContainer);
