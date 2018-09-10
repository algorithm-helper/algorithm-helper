import React from 'react';
import PropTypes from 'prop-types';

import { dashboardHeader } from './styles.scss';

/**
 * Renders the DashboardHeader stateless functional component.
 *
 * @param {object} props
 */
const DashboardHeader = props => {
  const text = `Welcome back, ${props.fullName}.`;

  return (
    <div className={dashboardHeader}>
      {text}
    </div>
  );
};

DashboardHeader.propTypes = {
  fullName: PropTypes.string,
};

export default DashboardHeader;
