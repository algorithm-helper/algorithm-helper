import React from 'react';
import PropTypes from 'prop-types';

import DashboardBookmarkItem from './DashboardBookmarkItem';
import {
  dashboardBookmarkContainer,
  dashboardBookmarkHeader,
  dashboardBookmarkBody,
} from './styles.scss';

/**
 * Renders the DashboardBookmarkContainer stateless functional component.
 *
 * @param {object} props
 */
const DashboardBookmarkContainer = props => (
  <div className={dashboardBookmarkContainer}>
    <div className={dashboardBookmarkHeader}>
      {props.title}
    </div>
    <div className={dashboardBookmarkBody}>
      {
        props.bookmarkItems && props.bookmarkItems.length > 0
          ? (
            props.bookmarkItems.map((bookmark, i) => (
              <DashboardBookmarkItem
                key={i}
                {...bookmark}
              />
            ))
          ) : (
            <div>
              You have no bookmarked items.
            </div>
          )
      }
    </div>
  </div>
);

DashboardBookmarkContainer.propTypes = {
  bookmarkItems: PropTypes.array,
  title: PropTypes.string,
};

export default DashboardBookmarkContainer;
