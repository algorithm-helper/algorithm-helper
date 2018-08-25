import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the DashboardPageBookmarkItem stateless functional component.
 *
 * @param {object} props
 */
const DashboardPageBookmarkItem = props => {
  let typeTitle;
  let iconComponent;

  switch (props.type) {
    case 'article':
      typeTitle = 'Article';
      iconComponent = <i className="fas fa-newspaper" />;
      break;
    case 'code':
      typeTitle = 'Code';
      iconComponent = <i className="fas fa-code" />;
      break;
    case 'video':
      typeTitle = 'Video';
      iconComponent = <i className="fas fa-play" />;
      break;
    default:
      break;
  }

  return (
    <div className="card dashboard-page-bookmarks-item-container">
      <div className="card-body">
        <div className="row">
          <div className="col-md-2">
            <div className="dashboard-page-bookmarks-item-type">
              <div className="dashboard-page-bookmarks-item-title">{typeTitle}</div>
              <div className="dashboard-page-bookmarks-item-subtitle">{iconComponent}</div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="dashboard-page-bookmarks-item-title">{props.topicItemTitle}</div>
            <div className="dashboard-page-bookmarks-item-subtitle">
              {props.categoryTitle}
              &rsaquo;
              {props.subcategoryTitle}
            </div>
          </div>
          <div className="col-md-2">
            <div className="dashboard-page-bookmarks-item-delete">
              <i className="fas fa-times dashboard-page-bookmarks-item-delete-btn" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardPageBookmarkItem.propTypes = {
  topicItemTitle: PropTypes.string,
  subcategoryTitle: PropTypes.string,
  categoryTitle: PropTypes.string,
  type: PropTypes.string,
};

export default DashboardPageBookmarkItem;