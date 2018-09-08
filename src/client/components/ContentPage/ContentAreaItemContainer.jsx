/* eslint-disable react/no-children-prop */
import React from 'react';
import PropTypes from 'prop-types';

import ContentAreaItem from './ContentAreaItem';
import { contentAreaItemContainer } from './styles.scss';

/**
 * Renders the ContentAreaItemContainer stateless functional component.
 *
 * @param {object} props
 */
const ContentAreaItemContainer = props => {
  const { contentData } = props;

  return (
    <div className={contentAreaItemContainer}>
      {
        contentData
        && contentData.map((item, i) => (
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
};

ContentAreaItemContainer.propTypes = {
  contentData: PropTypes.array,
};

export default ContentAreaItemContainer;
