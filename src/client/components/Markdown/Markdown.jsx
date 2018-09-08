/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import { markdownContainer } from './styles.scss';

/**
 * Renders the Markdown stateless functional component.
 *
 * @param {object} props
 */
const Markdown = props => (
  <div className={markdownContainer}>
    <div dangerouslySetInnerHTML={{ __html: props.markdownContent }} />
  </div>
);

Markdown.propTypes = {
  markdownContent: PropTypes.string,
};

export default Markdown;
