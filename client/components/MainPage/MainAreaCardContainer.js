import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Container,
  Row,

  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from 'reactstrap';

const mapColorKeyToColor = {
  0: '#072A60',
  1: '#33B5E5',
  2: '#AA66CC',
  3: '#81C784',
  4: '#F06292',
  5: '#7986CB',
  6: '#4DB6AC',
  7: '#FFB74D',
  8: '#E57373',
  9: '#90A4AE',
};

/**
 * Renders the MainAreaCardContainer stateless functional component.
 *
 * @param {object} props
 */
const MainAreaCardContainer = props => {
  console.log('main-area-card-container', props.cardData);

  return (<div className="main-area-card-container">
    <Container fluid>
      <Row>
        <Col md="1" />
        <Col md="10">
          <Row>
            {
              props.cardData.map((card, i) => (
                <Col key={i} md="4">
                  <Card className="main-area-card" style={{
                    backgroundColor: mapColorKeyToColor[card.colorKey],
                    borderColor: mapColorKeyToColor[card.colorKey],
                  }}>
                  <CardBody>
                    <CardTitle className="main-area-card-title">{card.title}</CardTitle>
                    <CardSubtitle className="main-area-card-subtitle"></CardSubtitle>
                  </CardBody>

                  <CardBody>
                    <CardText className="main-area-card-description">{card.description}</CardText>
                  </CardBody>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </Col>
        <Col md="1" />
      </Row>
    </Container>
  </div>);
};

MainAreaCardContainer.propTypes = {
  cardData: PropTypes.array.isRequired,
};

export default MainAreaCardContainer;

//                   <img className="main-area-card-img" width="100%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Apple_Music_Logo.png/256px-Apple_Music_Logo.png" alt={card.title} />
