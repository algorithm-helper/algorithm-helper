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
    this.getTopicItemComponent = this.getTopicItemComponent.bind(this);
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

  getTopicItemComponent() {
    switch(this.props.topicItem.type) {
      case 'article':
        return (
          <TopicItemArticleContainer
            contentLoaded={this.handleContentLoaded}
          />
        );
      case 'code':
        return (
          <TopicItemCodeContainer
            contentLoaded={this.handleContentLoaded}
          />
        );
      case 'video':
        return (
          <TopicItemVideoContainer
            contentLoaded={this.handleContentLoaded}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-2"/>
        <div className="col-md-8">
          {
            this.state.showTopicItemBar &&
            <TopicItemBar
              onMarkAsCompleted={this.props.onMarkAsCompleted}
              onSaveToBookmarks={this.props.onSaveToBookmarks}
            />
          }
          <div className="topic-item-container">
            { this.getTopicItemComponent() }
          </div>
        </div>
        <div className="col-md-2"/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey,
});

export default connect(mapStateToProps)(TopicItemContainer);
