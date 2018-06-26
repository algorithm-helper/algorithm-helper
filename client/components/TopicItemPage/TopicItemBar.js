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
            type="button"
            className="btn btn-topic-item-bar"
            style={{
              backgroundColor: colors[this.props.colorKey]
            }}
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
            type="button"
            className="btn btn-topic-item-bar"
            style={{
              backgroundColor: colors[this.props.colorKey]
            }}
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
