import React from 'react';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';
import { Col, Container, Row } from 'reactstrap';

import JumbotronMedium from 'components/JumbotronMedium';

import ContentAreaTableOfContents from './ContentAreaTableOfContents';
import ContentAreaItemContainer from './ContentAreaItemContainer';

import {
  contentPageContainer,
  contentPageSpinner,
} from './styles.scss';

/**
 * Renders the ContentPage stateless functional component.
 *
 * @param {object} props
 */
const ContentPage = props => (
  <div className={contentPageContainer}>
    <JumbotronMedium
      title={props.title}
    />
    {
      props.loading
        ? (
          <div className={contentPageSpinner}>
            <MDSpinner
              size={50}
              singleColor={props.color}
            />
          </div>
        )
        : (
          <Container fluid>
            <Row>
              <Col md="2" sm="2">
                <ContentAreaTableOfContents
                  title="Content"
                  contentData={props.contentDataTableOfContents}
                />
              </Col>
              <Col md="8" sm="10">
                <ContentAreaItemContainer
                  contentData={props.contentData}
                />
              </Col>
              <Col md="2" sm="0" />
            </Row>
          </Container>
        )
    }
  </div>
);

ContentPage.propTypes = {
  color: PropTypes.string,
  contentData: PropTypes.array,
  contentDataTableOfContents: PropTypes.array,
  loading: PropTypes.bool,
  title: PropTypes.string,
};

export default ContentPage;
