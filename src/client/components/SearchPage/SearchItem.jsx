import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  searchItemContainer,
  searchItemTitle,
  searchItemSubtitle,
} from './styles.scss';

/**
 * Renders the SearchItem stateless functional component.
 *
 * @param {object} props
 */
const SearchItem = props => (
  <div className={searchItemContainer}>
    <Link to={props.url}>
      <div className={searchItemTitle}>{props.topicTitle}</div>
      <div className={searchItemSubtitle}>{`${props.categoryTitle} / ${props.subcategoryTitle}`}</div>
    </Link>
    <div>{props.description}</div>
  </div>
);

SearchItem.propTypes = {
  url: PropTypes.string,
  topicTitle: PropTypes.string,
  subcategoryTitle: PropTypes.string,
  categoryTitle: PropTypes.string,
  description: PropTypes.string,
};

export default SearchItem;
