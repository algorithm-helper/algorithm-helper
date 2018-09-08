import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Container,
  Input,
  InputGroup,
  Row,
} from 'reactstrap';

import { mainAreaSearchBar } from './styles.scss';

/**
 * Renders the MainAreaSearchBar stateless functional component.
 *
 * @param {object} props
 */
const MainAreaSearchBar = props => (
  <Container fluid>
    <Row>
      <Col md="2" />
      <Col md="8">
        <InputGroup>
          <Input
            type="text"
            className={mainAreaSearchBar}
            placeholder={props.searchPlaceholder}
            onChange={props.onSearchChange}
            autoComplete="off"
          />
        </InputGroup>
      </Col>
      <Col md="2" />
    </Row>
  </Container>
);

MainAreaSearchBar.propTypes = {
  onSearchChange: PropTypes.func,
  searchPlaceholder: PropTypes.string,
};

export default MainAreaSearchBar;
