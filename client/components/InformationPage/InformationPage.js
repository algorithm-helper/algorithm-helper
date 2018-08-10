import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';

import JumbotronMedium from '../JumbotronMedium/';
import Markdown from '../Markdown';
import Footer from '../Footer';

import { resetColorTheme } from '../../actions/ColorThemeActions';
import settings from './settings.json';

const InformationPage = props => {
  props.dispatch(resetColorTheme());

  const { title, url } = settings[props.informationKey];

  return (
    <div>
      <JumbotronMedium title={title}/>
      <Container className="information-page-markdown-container" fluid>
        <Row>
          <Col md="2"/>
          <Col md="8">
            <Markdown url={url}/>
          </Col>
          <Col md="2"/>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

InformationPage.propTypes = {
  informationKey: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(InformationPage);
