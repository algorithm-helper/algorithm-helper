import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the DashboardPageHeader stateless functional component.
 *
 * @param {object} props
 */
const DashboardPageHeader = props => (
  <div className="dashboard-page-header">
    Welcome back, {props.fullName}.
  </div>
);

DashboardPageHeader.propTypes = {
  fullName: PropTypes.string.isRequired,
};

export default DashboardPageHeader;
