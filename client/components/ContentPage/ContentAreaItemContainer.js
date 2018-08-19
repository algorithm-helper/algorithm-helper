import React from 'react';
import PropTypes from 'prop-types';

import ContentAreaItem from './ContentAreaItem';

/**
 * Renders the ContentAreaItemContainer stateless functional component.
 *
 * @param {object} props
 */
const ContentAreaItemContainer = props => (
  <div className="content-area-item-container">
    {
      props.contentData
      && props.contentData.map((item, i) => (
        <ContentAreaItem
          key={i}
          title={item.title}
          itemKey={item.key}
          urlKey={item.urlKey}
          description={item.description}
          children={item.children}
          isTopicItem={item.isTopicItem}
        />
      ))
    }
  </div>
);

ContentAreaItemContainer.propTypes = {
  contentData: PropTypes.array.isRequired,
};

export default ContentAreaItemContainer;
