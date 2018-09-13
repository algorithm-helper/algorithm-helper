import React from 'react';
import PropTypes from 'prop-types';

import JumbotronSmall from 'components/JumbotronSmall';

import TopicItemNavBar from './TopicItemNavBar';
import TopicItemContainer from './TopicItemContainer';

import TopicItemBar from './TopicItemBar';

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

    {
      !props.loading && props.userAccount.isLoggedIn
      && (
        <TopicItemBar
          onMarkAsCompleted={props.onMarkAsCompleted}
          onSaveToBookmarks={props.onSaveToBookmarks}
          isCompleted={props.isCompleted}
          isBookmarked={props.isBookmarked}
        />
      )
    }

    <TopicItemContainer
      color={props.color}
      topicItemComponent={props.topicItemComponent}
      isCompleted={props.isCompleted}
      isBookmarked={props.isBookmarked}
      onMarkAsCompleted={props.onMarkAsCompleted}
      onSaveToBookmarks={props.onSaveToBookmarks}
      userAccount={props.userAccount}
    />
  </div>
);

TopicItemPage.propTypes = {
  color: PropTypes.string,
  isCompleted: PropTypes.bool,
  isBookmarked: PropTypes.bool,
  indexSelected: PropTypes.number,
  onChangeIndex: PropTypes.func,
  onMarkAsCompleted: PropTypes.func,
  onSaveToBookmarks: PropTypes.func,
  topic: PropTypes.object,
  topicItemComponent: PropTypes.object,
  topicItemTypes: PropTypes.array,
  subcategory: PropTypes.object,
  urlKey: PropTypes.string,
  userAccount: PropTypes.object,
};

export default TopicItemPage;
