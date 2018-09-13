import React from 'react';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';
import { Col, Container, Row } from 'reactstrap';

import TopicItemBar from './TopicItemBar';

import {
  topicItemContainer,
  topicItemPageSpinnerContainer,
} from './styles.scss';

/**
 * Renders the TopicItemContainer stateless functional component.
 *
 * @param {object} props
 */
const TopicItemContainer = props => (
  <Container fluid>
    <Row>
      <Col md="2" />
      <Col md="8">
        {
          props.loading
          && (
            <div className={topicItemPageSpinnerContainer}>
              <MDSpinner
                size={50}
                singleColor={props.color}
              />
            </div>
          )
        }

        {props.topicItemComponent}
      </Col>
      <Col md="2" />
    </Row>
  </Container>
);

TopicItemContainer.propTypes = {
  color: PropTypes.string,
  isBookmarked: PropTypes.bool,
  isCompleted: PropTypes.bool,
  onMarkAsCompleted: PropTypes.func,
  onSaveToBookmarks: PropTypes.func,
  topicItemComponent: PropTypes.object,
};

export default TopicItemContainer;

/**

        <div className={topicItemContainer}>
          {props.topicItemComponent}
        </div>

 */

 /*
        {
          !props.loading && props.userAccount.isLoggedIn
          && (
            <TopicItemBar
              onMarkAsCompleted={props.onMarkAsCompleted}
              onSaveToBookmarks={props.onSaveToBookmarks}
              isCompleted={props.isCompleted}
              isBookmarked={props.isBookmarked}
            />
          )
        }
 */
