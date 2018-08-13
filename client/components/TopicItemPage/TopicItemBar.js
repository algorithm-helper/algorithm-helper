import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

/**
 * Renders the TopicItemBar stateless functional component.
 *
 * @param {object} props
 */
const TopicItemBar = props => (
  <div className="topic-item-bar-container">
    <div className="topic-item-bar-item">
      <Button
        color="primary"
        className="topic-item-bar-btn"
        onClick={props.onMarkAsCompleted}>
        <i
          className="fas fa-check"
          style={{ marginRight: '0.5em' }}
        />
        Mark as Completed
      </Button>
    </div>
    <div className="topic-item-bar-item">
      <Button
        color="primary"
        className="topic-item-bar-btn"
        onClick={props.onSaveToBookmarks}>
        <i
          className="fas fa-star"
          style={{ marginRight: '0.5em' }}
        />
        Save to Bookmarks
      </Button>
    </div>
  </div>
);

const mapStateToProps = state => ({
  colorKey: state.colorKey
});

export default connect(mapStateToProps)(TopicItemBar);
