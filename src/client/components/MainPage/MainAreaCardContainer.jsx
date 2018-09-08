import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';

import MainAreaCard from './MainAreaCard';

import { mainAreaCardContainer } from './styles.scss';

/**
 * Renders the MainAreaCardContainer stateless functional component.
 *
 * @param {object} props
 */
const MainAreaCardContainer = props => (
  <div className={mainAreaCardContainer}>
    <Container fluid>
      <Row>
        <Col md="1" />
        <Col md="10">
          <Row>
            {
              props.cardData.map((card, i) => (
                <Col key={i} md="4">
                  <MainAreaCard
                    colorKey={card.colorKey}
                    imageUrl={card.imageUrl}
                    url={card.url}
                    title={card.title}
                    description={card.description}
                  />
                </Col>
              ))
            }
          </Row>
        </Col>
        <Col md="1" />
      </Row>
    </Container>
  </div>
);

MainAreaCardContainer.propTypes = {
  cardData: PropTypes.array,
};

export default MainAreaCardContainer;
