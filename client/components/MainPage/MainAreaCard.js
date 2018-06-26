import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Utils:
import i18n from '../../utils/i18n';

/**
 * Renders the MainAreaCard stateless functional component.
 *
 * @param {object} props
 */
const MainAreaCard = props => (
  <div className="card mb-4">
    <div className="card-body">
      <h4 className="card-title">{props.title}</h4>
      <div className={`card-pill color-white ${props.pillBg}`}>{props.pillText}</div>
      <p className="card-text">{props.description}</p>
      <Link to={props.urlKey}>
        <button type="button" className="btn btn-blue btn-md">{i18n.mainAreaCard.btnText['en']}</button>
      </Link>
    </div>
  </div>
);

MainAreaCard.propTypes = {
  description: PropTypes.string.isRequired,
  pillBg: PropTypes.string.isRequired,
  pillText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  urlKey: PropTypes.string.isRequired,
};

export default MainAreaCard;
