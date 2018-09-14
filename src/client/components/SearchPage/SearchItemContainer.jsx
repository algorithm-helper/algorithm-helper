import React from 'react';
import PropTypes from 'prop-types';

import SearchItem from './SearchItem';
import SearchNoResults from './SearchNoResults';

/**
 * Renders the SearchItemContainer stateless functional component.
 *
 * @param {object} props
 */
const SearchItemContainer = props => (
  <div>
    {
      props.searchItems && props.searchItems.length > 0
        ? (
          props.searchItems.map((item, i) => (
            <SearchItem
              key={i}
              {...item}
            />
          ))
        ) : (
          <SearchNoResults
            title="No results found."
            subtitle="Try a different search term."
          />
        )
    }
  </div>
);

SearchItemContainer.propTypes = {
  searchItems: PropTypes.array,
};

export default SearchItemContainer;
