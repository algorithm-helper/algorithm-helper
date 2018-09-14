import React from 'react';
import PropTypes from 'prop-types';

import SearchItem from './SearchItem';

/**
 * Renders the SearchItemContainer stateless functional component.
 *
 * @param {object} props
 */
const SearchItemContainer = props => (
  <div>
    {
      props.searchItems
      && (
        props.searchItems.map((item, i) => (
          <SearchItem
            key={i}
            {...item}
          />
        ))
      )
    }
  </div>
);

SearchItemContainer.propTypes = {
  searchItems: PropTypes.array,
};

export default SearchItemContainer;
