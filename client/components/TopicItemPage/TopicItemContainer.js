import React from 'react';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';

import TopicItemArticleContainer from './TopicItemArticleContainer';
import TopicItemCodeContainer from './TopicItemCodeContainer';
import TopicItemBar from './TopicItemBar';

import getColorFromKey from '../../utils/getColorFromKey';

class TopicItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
  }

  componentWillReceiveProps() {
    this.setState({ loading: true });
  }

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
};

const mapStateToProps = state => ({
  colorKey: state.colorKey,
});

export default connect(mapStateToProps)(TopicItemContainer);
