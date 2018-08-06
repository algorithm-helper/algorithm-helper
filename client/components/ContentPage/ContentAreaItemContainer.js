import React from 'react';
import PropTypes from 'prop-types';

import ContentAreaItem from './ContentAreaItem';
import { getContentUrlKey } from '../../utils/routeUtils';

/**
 * Renders the ContentAreaItemContainer stateless functional component.
 *
 * @param {object} props
 */
class ContentAreaItemContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // window.addEventListener('hashchange', () => {
    //   if (window.location.hash && $(window.location.hash).length) {
    //     var newTop = $(window.location.hash).offset().top - 80;
    //     $(window).scrollTop(newTop);
    //   }
    // }, false);
  }

  render() {
    return (
      <div className="content-area-item-container">
        {
          this.props.contentData
          && this.props.contentData.map((item, i) => (
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
  }
}

ContentAreaItemContainer.propTypes = {
  contentData: PropTypes.array.isRequired,
};

export default ContentAreaItemContainer;
