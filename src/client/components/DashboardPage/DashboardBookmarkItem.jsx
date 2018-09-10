import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Col, Container, Row } from 'reactstrap';

import {
  dashboardBookmarkItemContainer,
  dashboardBookmarkItemTitle,
  dashboardBookmarkItemSubtitle,
  dashboardBookmarkItemTypeContainer,
  dashboardBookmarkItemType,
  dashboardBookmarkItemDelete,
  dashboardBookmarkItemDeleteBtn,
} from './styles.scss';

/**
 * Renders the DashboardBookmarkItem stateless functional component.
 *
 * @param {object} props
 */
const DashboardBookmarkItem = props => {
  let typeTitle;
  let iconComponent;

  switch (props.type) {
    case 'article':
      typeTitle = 'Article';
      iconComponent = <i className="fas fa-newspaper" />;
      break;
    case 'code':
      typeTitle = 'Code';
      iconComponent = <i className="fas fa-code" />;
      break;
    case 'video':
      typeTitle = 'Video';
      iconComponent = <i className="fas fa-play" />;
      break;
    default:
      return null;
  }

  return (
    <Container fluid>
      <div className={classnames('card', dashboardBookmarkItemContainer)}>
        <div className="card-body">
          <Row>
            <Col className={dashboardBookmarkItemTypeContainer} md="2">
              <div className={dashboardBookmarkItemType}>
                <div className={dashboardBookmarkItemTitle}>{typeTitle}</div>
                <div className={dashboardBookmarkItemSubtitle}>{iconComponent}</div>
              </div>
            </Col>

            <Col md="8">
              <div className={dashboardBookmarkItemTitle}>{props.topicItemTitle}</div>
              <div className={dashboardBookmarkItemSubtitle}>
                {`${props.categoryTitle} / ${props.subcategoryTitle}`}
              </div>
            </Col>

            <Col md="2">
              <div className={dashboardBookmarkItemDelete}>
                <i className={classnames('fas', 'fa-times', dashboardBookmarkItemDeleteBtn)} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

DashboardBookmarkItem.propTypes = {
  categoryTitle: PropTypes.string,
  subcategoryTitle: PropTypes.string,
  topicItemTitle: PropTypes.string,
  type: PropTypes.string,
};

export default DashboardBookmarkItem;
