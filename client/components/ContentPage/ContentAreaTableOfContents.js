import React from 'react';
import PropTypes from 'prop-types';

export default class ContentAreaTableOfContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1,
    };
    this.handleSelectTableItem = this.handleSelectTableItem.bind(this);
  }

  handleSelectTableItem(index) {
    this.setState({
      selectedIndex: index,
    });
  }

  render() {
    return (
      <div className="content-area-toc">
        <div className="content-area-toc-title">{this.props.title}</div>
        <div className="content-area-toc-container">
          {
            this.props.contentData &&
            this.props.contentData.map((item, i) => {
              return (
                <div
                  className={`content-area-toc-item ${i === this.state.selectedIndex ?
                    'content-area-toc-item-selected' : ''}`}
                  key={i}>
                  <a
                    href={`#${item.key}`}
                    onClick={() => {
                      this.handleSelectTableItem(i);
                    }}
                  >
                    {item.title}
                  </a>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

ContentAreaTableOfContents.propTypes = {
  contentData: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
