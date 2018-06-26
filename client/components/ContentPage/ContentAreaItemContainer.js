import React from 'react';
import PropTypes from 'prop-types';

import ContentAreaProgress from './ContentAreaProgress';
import ContentAreaItem from './ContentAreaItem';

import { getContentUrlKey } from '../../utils/routeUtils';

export default class ContentAreaItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlKey: '',
      loading: false,
    };
  }

  componentWillMount() {
    window.addEventListener('hashchange', () => {
      if (window.location.hash && $(window.location.hash).length) {
        var newTop = $(window.location.hash).offset().top - 80;
        $(window).scrollTop(newTop);
      }
    }, false);
  }

  render() {
    return (
      <div>
        <ContentAreaProgress />
        <div className="categories-item-container">
          {
            this.props.contentData &&
            this.props.contentData.map((item, i) => {
              return (
                <ContentAreaItem
                  title={item.title}
                  itemKey={item.key}
                  urlKey={item.urlKey}
                  description={item.description}
                  bgName={`bg-${item.colorKey}`}
                  colorName={`color-${item.colorKey}`}
                  children={item.children}
                  key={i}
                  isTopicItem={item.isTopicItem}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

ContentAreaItemContainer.propTypes = {
  contentData: PropTypes.array.isRequired,
};

