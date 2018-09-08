import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';

import {
  footerContainer,
  footerItem,
  footerItemLink,
} from './styles.scss';

/**
 * Renders the Footer stateless functional component.
 *
 * @param {object} props
 */
const Footer = () => (
  <div className={footerContainer}>
    <Container fluid>
      <Row>
        <Col md="2" />
        <Col md="8">
          <Link
            className={classnames(footerItem, footerItemLink)}
            to="/about"
          >
            About
          </Link>
          <Link
            className={classnames(footerItem, footerItemLink)}
            to="/terms-and-conditions"
          >
            Terms and Conditions
          </Link>
          <Link
            className={classnames(footerItem, footerItemLink)}
            to="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <div className={footerItem}>
            &copy; 2018 Algorithm Helper. All rights reserved.
          </div>
        </Col>
        <Col md="2" />
      </Row>
    </Container>
  </div>
);

Footer.propTypes = {};

export default Footer;
