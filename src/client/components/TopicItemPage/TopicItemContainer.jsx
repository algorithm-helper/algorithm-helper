import React from 'react';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';
import { Col, Container, Row } from 'reactstrap';

import { topicItemPageSpinnerContainer } from './styles.scss';

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
  topicItemComponent: PropTypes.object,
};

export default TopicItemContainer;
