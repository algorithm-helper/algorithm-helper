import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

import getColorFromKey from '../../utils/getColorFromKey';

/**
 * Renders the MainAreaCard stateless functional component.
 *
 * @param {object} props
 */
const MainAreaCard = props => (
  <Card className="main-area-card" style={{
    backgroundColor: getColorFromKey(props.colorKey),
    borderColor: getColorFromKey(props.colorKey),
  }}>
    <Link className="main-area-card-link" to={props.url}>
      <CardBody>
        <CardTitle className="main-area-card-title">{props.title}</CardTitle>
        <CardSubtitle className="main-area-card-subtitle"></CardSubtitle>
      </CardBody>

      <CardBody>
        <CardText className="main-area-card-description">{props.description}</CardText>
      </CardBody>
    </Link>
  </Card>
);

MainAreaCard.propTypes = {
  colorKey: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default MainAreaCard;

// <img className="main-area-card-img" width="100%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Apple_Music_Logo.png/256px-Apple_Music_Logo.png" alt={card.title} />
