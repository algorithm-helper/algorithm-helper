import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the DashboardPageHeader stateless functional component.
 *
 * @param {object} props
 */
const DashboardPageHeader = props => {
  const text = `Welcome back, ${props.fullName}.`;

  return (
    <div className="dashboard-page-header">
      {text}
    </div>
  );
};

DashboardPageHeader.propTypes = {
  fullName: PropTypes.string,
};

export default DashboardPageHeader;
