import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';

import getColorFromKey from 'utils/getColorFromKey';

import {
  jumbotronMd,
  jumbotronMdTextContainer,
  jumbotronMdTitle,
} from './styles.scss';

/**
 * Renders the JumbotronMedium stateless functional component.
 *
 * @param {object} props
 */
const JumbotronMedium = props => (
  <Container fluid>
    <Row
      className={jumbotronMd}
      style={{ backgroundColor: getColorFromKey(props.colorKey) }}
    >
      <Col md="12">
        <div className={jumbotronMdTextContainer}>
          <div className={jumbotronMdTitle}>{props.title}</div>
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

export default connect(mapStateToProps)(JumbotronMedium);
