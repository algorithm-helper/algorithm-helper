import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputGroup } from 'reactstrap';

import {
  searchBarContainer,
  searchBar,
} from './styles.scss';

/**
 * Renders the SearchBar stateless functional component.
 *
 * @param {object} props
 */
const SearchBar = props => (
  <div className={searchBarContainer}>
    <InputGroup>
      <Input
        className={searchBar}
        type="text"
        placeholder={props.searchPlaceholder}
        onChange={props.onSearchChange}
        onKeyPress={props.onEnterKeyPressed}
        autoComplete="off"
      />
    </InputGroup>
  </div>
);

SearchBar.propTypes = {
  onSearchChange: PropTypes.func,
  onEnterKeyPressed: PropTypes.func,
  searchPlaceholder: PropTypes.string,
};

export default SearchBar;
