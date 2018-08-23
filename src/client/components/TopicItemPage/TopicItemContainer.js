import React from 'react';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';

import TopicItemArticle from './TopicItemArticle';
import TopicItemCode from './TopicItemCode';
import TopicItemBar from './TopicItemBar';

import getColorFromKey from '../../utils/getColorFromKey';

class TopicItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isCompleted: false,
      isBookmarked: false,
      topicItem: null,
      topic: null,
    };
  }

  componentWillMount() {
    this.setState({
      loading: true,
      topicItem: this.props.topicItem,
      topic: this.props.topic,
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      loading: true,
      topicItem: newProps.topicItem,
      topic: newProps.topic,
    });
  }

  /**
   * Makes a request to the server to check the completion and bookmark status of this current
   * topic item for this current logged in user.
   */
  requestCompletionAndBookmarkStatus = () => {
    // TODO
  };

  /**
   * Handles when the content finishes loading.
   */
  handleContentLoaded = () => {
    this.setState({ loading: false });
  };

  /**
   * Returns the topic item component that corresponds to the topic item type.
   */
  getTopicItemComponent = () => {
    if (!this.state.topicItem) {
      return;
    }

    // Collect items with the same type:
    const metaData = this.state.topic.children.filter(item => {
      return item.type === this.state.topicItem.type
    });

    switch(this.state.topicItem.type) {
      case 'article':
        return (
          <TopicItemArticle
            contentLoaded={this.handleContentLoaded}
            type={this.state.topicItem.type}

          />
        );
      case 'code':
        return (
          <TopicItemCode
            contentLoaded={this.handleContentLoaded}
            type={this.state.topicItem.type}
            metaData={metaData}
          />
        );
      default:
        return null;
    }
  };

  /**
   * Renders the TopicItemContainer component.
   */
  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="2"/>
          <Col md="8">
            {
              this.state.loading
              && <div className="topic-item-page-spinner-container">
                  <MDSpinner
                    size={50}
                    singleColor={getColorFromKey(this.props.colorKey)}
                  />
                </div>
            }
            {
              !this.state.loading
              && <TopicItemBar
                  onMarkAsCompleted={this.props.onMarkAsCompleted}
                  onSaveToBookmarks={this.props.onSaveToBookmarks}
                  isCompleted={this.state.isCompleted}
                  isBookmarked={this.state.isBookmarked}
                />
            }
            <div className="topic-item-container">
              { this.getTopicItemComponent() }
            </div>
          </Col>
          <Col md="2"/>
        </Row>
      </Container>
    );
  }
}

TopicItemContainer.propTypes = {
  onMarkAsCompleted: PropTypes.func.isRequired,
  onSaveToBookmarks: PropTypes.func.isRequired,
  topicItem: PropTypes.object,
  topic: PropTypes.object,
};

const mapStateToProps = state => ({
  colorKey: state.colorKey,
});

export default connect(mapStateToProps)(TopicItemContainer);
