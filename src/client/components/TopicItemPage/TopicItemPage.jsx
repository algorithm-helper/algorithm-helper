import React from 'react';
import PropTypes from 'prop-types';

import JumbotronSmall from 'components/JumbotronSmall';

import TopicItemNavBar from './TopicItemNavBar';
import TopicItemContainer from './TopicItemContainer';

import { topicItemPage } from './styles.scss';

/**
 * Renders the TopicItemPage stateless functional component.
 *
 * @param {object} props
 */
const TopicItemPage = props => (
  <div className={topicItemPage}>
    <JumbotronSmall
      title={props.topic.title}
      subtitle={props.subcategory.title}
      urlKey={props.urlKey}
    />

    <TopicItemNavBar
      indexStart={props.indexSelected}
      handleChangeIndex={props.onChangeIndex}
      topicItemTypes={props.topicItemTypes}
    />

    <TopicItemContainer
      isCompleted={props.isCompleted}
      isBookmarked={props.isBookmarked}
      topic={props.topic}
      topicItem={props.topicItemTypes[props.indexSelected]}
      onMarkAsCompleted={props.onMarkAsCompleted}
      onSaveToBookmarks={props.onSaveToBookmarks}
    />
  </div>
);

TopicItemPage.propTypes = {
  isCompleted: PropTypes.bool,
  isBookmarked: PropTypes.bool,
  indexSelected: PropTypes.number,
  onChangeIndex: PropTypes.func,
  onMarkAsCompleted: PropTypes.func,
  onSaveToBookmarks: PropTypes.func,
  topic: PropTypes.object,
  topicItemTypes: PropTypes.array,
  subcategory: PropTypes.object,
  urlKey: PropTypes.string,
};

export default TopicItemPage;
