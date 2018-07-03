import React from 'react';
import { connect } from 'react-redux';

// Data:
import colors from '../../../data/colors.json';

class TopicItemBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="topic-item-bar-container">
        <div className="topic-item-bar-item">
          <button
            className="btn btn-blue-grey btn-topic-item-bar"
            onClick={this.props.onMarkAsCompleted}
          >
            <i
              className="fas fa-check"
              style={{
                marginRight: '0.5em'
              }}
            />
            Mark as Completed
          </button>
        </div>
        <div className="topic-item-bar-item">
          <button
            className="btn btn-blue-grey btn-topic-item-bar"
            onClick={this.props.onSaveToBookmarks}
          >
            <i
              className="fas fa-star"
              style={{
                marginRight: '0.5em'
              }}
            />
            Save to Bookmarks
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(TopicItemBar);
