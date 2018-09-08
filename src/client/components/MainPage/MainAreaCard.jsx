import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import getColorFromKey from 'utils/getColorFromKey';

import {
  mainAreaCard,
  mainAreaCardLink,
  mainAreaCardTitle,
  mainAreaCardSubtitle,
  mainAreaCardDescription,
  mainAreaCardBodyBottom,
} from './styles.scss';

/**
 * Renders the MainAreaCard stateless functional component.
 *
 * @param {object} props
 */
const MainAreaCard = props => (
  <Card
    className={mainAreaCard}
    style={{
      backgroundColor: getColorFromKey(props.colorKey),
      borderColor: getColorFromKey(props.colorKey),
      backgroundImage: `url(${props.imageUrl})`,
    }}
  >
    <Link
      className={mainAreaCardLink}
      to={props.url}
    >
      <CardBody>
        <CardTitle className={mainAreaCardTitle}>
          {props.title}
        </CardTitle>
        <CardSubtitle className={mainAreaCardSubtitle} />
      </CardBody>
      <CardBody className={mainAreaCardBodyBottom}>
        <CardText className={mainAreaCardDescription}>
          {props.description}
        </CardText>
      </CardBody>
    </Link>
  </Card>
);

MainAreaCard.propTypes = {
  colorKey: PropTypes.number,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
};

export default MainAreaCard;
