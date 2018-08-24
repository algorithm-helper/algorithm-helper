import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';

/**
 * Renders the Footer stateless functional component.
 *
 * @param {object} props
 */
const Footer = () => (
  <div className="footer-container">
    <Container fluid>
      <Row>
        <Col md="2" />
        <Col md="8">
          <Link className="footer-item footer-item-link" to="/about">
            About
          </Link>
          <Link className="footer-item footer-item-link" to="/terms-and-conditions">
            Terms and Conditions
          </Link>
          <Link className="footer-item footer-item-link" to="/privacy-policy">
            Privacy Policy
          </Link>
          <div className="footer-item">
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
