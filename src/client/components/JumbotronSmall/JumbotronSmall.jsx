import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import getColorFromKey from 'utils/getColorFromKey';

import {
  jumbotronSm,
  jumbotronSmTextContainer,
  jumbotronSmTitle,
  jumbotronSmSubtitle,
} from './styles.scss';

/**
 * Renders the JumbotronSmall stateless functional component.
 *
 * @param {object} props
 */
const JumbotronSmall = props => (
  <Container fluid>
    <Row
      className={jumbotronSm}
      style={{ backgroundColor: getColorFromKey(props.colorKey) }}
    >
      <Col md="12">
        <div className={jumbotronSmTextContainer}>
          <div className={jumbotronSmTitle}>{props.title}</div>
          <div className={jumbotronSmSubtitle}>
            <Link to={props.urlKey}>
              {
                props.subtitle && (`${String.fromCharCode(0x02190)} ${props.subtitle}`)
              }
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
);

JumbotronSmall.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  urlKey: PropTypes.string,
};

const mapStateToProps = state => ({
  colorKey: state.colorKey,
});

export default connect(mapStateToProps)(JumbotronSmall);
