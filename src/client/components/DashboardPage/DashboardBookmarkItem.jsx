import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import {
  dashboardBookmarkItemContainer,
  dashboardBookmarkItemTitle,
  dashboardBookmarkItemSubtitle,
  dashboardBookmarkItemDelete,
  dashboardBookmarkItemDeleteBtn,
} from './styles.scss';

/**
 * Renders the DashboardBookmarkItem stateless functional component.
 *
 * @param {object} props
 */
const DashboardBookmarkItem = props => (
  <Container fluid>
    <div className={classnames('card', dashboardBookmarkItemContainer)}>
      <div className="card-body">
        <Row>
          <Col md="10">
            <Link to={props.url}>
              <div className={dashboardBookmarkItemTitle}>{props.topicTitle}</div>
              <div className={dashboardBookmarkItemSubtitle}>
                {`${props.categoryTitle} / ${props.subcategoryTitle}`}
              </div>
            </Link>
          </Col>
        </Row>

        <div className={dashboardBookmarkItemDelete}>
          <i
            className={classnames('fas', 'fa-times', dashboardBookmarkItemDeleteBtn)}
            onClick={() => props.onBookmarkDeleteRequest(props.topicKey)}
          />
        </div>
      </div>
    </div>
  </Container>
);

DashboardBookmarkItem.propTypes = {
  url: PropTypes.string,
  categoryTitle: PropTypes.string,
  subcategoryTitle: PropTypes.string,
  topicTitle: PropTypes.string,
  onBookmarkDeleteRequest: PropTypes.func,
  topicKey: PropTypes.string,
};

export default DashboardBookmarkItem;
