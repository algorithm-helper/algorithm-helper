import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Container,
  Row,
} from 'reactstrap';

import {
  topicItemBarContainer,
  topicItemBarItem,
  topicItemBarBtn,
} from './styles.scss';

/**
 * Renders the TopicItemBar stateless functional component.
 *
 * @param {object} props
 */
const TopicItemBar = props => {
  console.log(props.isCompleted, props.isBookmarked);

  return (
    <Container fluid>
      <Row>
        <Col md="2" />
        <Col md="8">
          <div className={topicItemBarContainer}>
            <div className={topicItemBarItem}>
              <Button
                color="primary"
                className={topicItemBarBtn}
                onClick={props.onMarkAsCompleted}
              >
                <i
                  className="fas fa-check"
                  style={{ marginRight: '0.5em' }}
                />
                {
                  !props.isCompleted
                    ? 'Mark as Completed'
                    : 'Mark as Uncompleted'
                }
              </Button>
            </div>
            <div className={topicItemBarItem}>
              <Button
                color="primary"
                className={topicItemBarBtn}
                onClick={props.onSaveToBookmarks}
              >
                <i
                  className="fas fa-star"
                  style={{ marginRight: '0.5em' }}
                />
                {
                  !props.isBookmarked
                    ? 'Save to Bookmarks'
                    : 'Remove from Bookmarks'
                }
              </Button>
            </div>
          </div>
        </Col>
        <Col md="2" />
      </Row>
    </Container>
  );
};

TopicItemBar.propTypes = {
  isBookmarked: PropTypes.bool,
  isCompleted: PropTypes.bool,
  onSaveToBookmarks: PropTypes.func,
  onMarkAsCompleted: PropTypes.func,
};

export default TopicItemBar;
