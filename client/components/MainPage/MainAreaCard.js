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
  <Card
    className="main-area-card"
    style={{
      backgroundColor: getColorFromKey(props.colorKey),
      borderColor: getColorFromKey(props.colorKey),
      backgroundImage: `url(${'https://s3.amazonaws.com/algorithm-helper/misc/test.png'})`,
    }}
  >
    <Link className="main-area-card-link" to={props.url}>
      <CardBody>
        <CardTitle className="main-area-card-title">{props.title}</CardTitle>
        <CardSubtitle className="main-area-card-subtitle"></CardSubtitle>
      </CardBody>
      <CardBody className="main-area-card-body-bottom">
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
