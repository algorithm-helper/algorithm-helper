import React from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';

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
  handleSelectTableItem = index => {
    this.setState({ selectedIndex: index });
  };

  /**
   * Returns the class name corresponding to when the item is selected in the table of contents.
   */
  getSelectedClassName = index => {
    const { selectedIndex } = this.state;
    return index === selectedIndex ? 'content-area-toc-item-selected' : '';
  };

  /**
   * Renders the ContentAreaTableOfContents component.
   */
  render() {
    const { title, contentData } = this.props;

    return (
      <div className="content-area-toc">
        <div className="content-area-toc-title">
          {title}
        </div>
        <div className="content-area-toc-container">
          {
            contentData
            && contentData.map((item, i) => (
              <div
                className={`content-area-toc-item ${this.getSelectedClassName(i)}`}
                key={i}
              >
                <Link
                  smooth
                  to={`#${item.key}`}
                  onClick={() => this.handleSelectTableItem(i)}
                >
                  {item.title}
                </Link>
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
