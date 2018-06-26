import React from 'react';
import MDSpinner from 'react-md-spinner';
import { connect } from 'react-redux';

// Components:
import TopicItemArticleContainer from './TopicItemArticleContainer';
import TopicItemCodeContainer from './TopicItemCodeContainer';
import TopicItemVideoContainer from './TopicItemVideoContainer';
import TopicItemBar from './TopicItemBar';

// Data:
import colors from '../../../data/colors.json';

class TopicItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      showTopicItemBar: false,
    };

    this.handleContentLoaded = this.handleContentLoaded.bind(this);
  }

  componentWillMount() {
    this.setState({
      loading: true,
      showTopicItemBar: false,
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  }

  componentWillReceiveProps() {
    this.setState({
      loading: true,
      showTopicItemBar: false,
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  }

  handleContentLoaded() {
    this.setState({ showTopicItemBar: true });
  }

  render() {
    let topicItemComponent;
    switch(this.props.topicItem.type) {
      case 'article':
        topicItemComponent = (
          <TopicItemArticleContainer
            contentLoaded={this.handleContentLoaded}
          />
        );
        break;
      case 'code':
        topicItemComponent = (
          <TopicItemCodeContainer
            contentLoaded={this.handleContentLoaded}
          />
        );
        break;
      case 'video':
        topicItemComponent = (
          <TopicItemVideoContainer
            contentLoaded={this.handleContentLoaded}
          />
        );
        break;
      default:
        break;
    }

    return (
      <div className="row">
        <div className="col-md-2"/>
        <div className="col-md-8">
          {
            this.state.showTopicItemBar &&
            <TopicItemBar />
          }
          <div className="topic-item-container">
            { topicItemComponent }
          </div>
        </div>
        <div className="col-md-2"/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(TopicItemContainer);
