import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';

import getColorFromKey from 'utils/getColorFromKey';

/**
 * Renders the JumbotronMedium stateless functional component.
 *
 * @param {object} props
 */
const JumbotronMedium = props => (
  <Container fluid>
    <Row
      className="jumbotron-md"
      style={{ backgroundColor: getColorFromKey(props.colorKey) }}
    >
      <Col md="12">
        <div className="jumbotron-md-text-container">
          <div className="jumbotron-md-title">{props.title}</div>
        </div>
      </Col>
    </Row>
  </Container>
);

JumbotronMedium.propTypes = {
  title: PropTypes.string,
};

const mapStateToProps = state => ({
  colorKey: state.colorKey,
});

export default compose(
  connect(mapStateToProps),
)(JumbotronMedium);
