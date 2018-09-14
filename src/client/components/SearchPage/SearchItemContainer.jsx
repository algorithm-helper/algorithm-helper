import React from 'react';
import PropTypes from 'prop-types';

import SearchSpinner from './SearchSpinner';
import SearchItem from './SearchItem';
import SearchNoResults from './SearchNoResults';

/**
 * Renders the SearchItemContainer stateless functional component.
 *
 * @param {object} props
 */
const SearchItemContainer = props => {
  let component;
  if (props.loading) {
    component = (
      <SearchSpinner
        color={props.color}
      />
    );
  } else {
    component = (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  return (
    <div>
      {component}
    </div>
  );
};

SearchItemContainer.propTypes = {
  color: PropTypes.string,
  loading: PropTypes.bool,
  searchItems: PropTypes.array,
};

export default SearchItemContainer;
