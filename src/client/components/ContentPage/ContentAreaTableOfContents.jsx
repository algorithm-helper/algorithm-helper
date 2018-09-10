import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { HashLink } from 'react-router-hash-link';

import {
  contentAreaToc,
  contentAreaTocContainer,
  contentAreaTocTitle,
  contentAreaTocItem,
  contentAreaTocItemSelected,
} from './styles.scss';

class ContentAreaTableOfContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1,
    };
  }

  /**
   * Handles the selected index change when a table item is selected.
   *
   * @param {number} index
   */
  onSelectTableItem = index => {
    this.setState({ selectedIndex: index });
  };

  /**
   * Returns the class name corresponding to when the item is selected in the table of contents.
   */
  getSelectedClassName = index => {
    const { selectedIndex } = this.state;
    return index === selectedIndex ? contentAreaTocItemSelected : '';
  };

  /**
   * Renders the ContentAreaTableOfContents component.
   */
  render() {
    const { title, contentData } = this.props;

    return (
      <div className={contentAreaToc}>
        <div className={contentAreaTocTitle}>
          {title}
        </div>
        <div className={contentAreaTocContainer}>
          {
            contentData
            && contentData.map((item, i) => (
              <div
                className={classnames(contentAreaTocItem, this.getSelectedClassName(i))}
                key={i}
              >
                <HashLink
                  smooth
                  to={`#${item.key}`}
                  onClick={() => this.onSelectTableItem(i)}
                >
                  {item.title}
                </HashLink>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

ContentAreaTableOfContents.propTypes = {
  contentData: PropTypes.array,
  title: PropTypes.string,
};

export default ContentAreaTableOfContents;
