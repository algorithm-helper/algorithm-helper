/* eslint-disable no-else-return */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarHeatmap from 'react-calendar-heatmap';

import {
  dashboardCalendarHeatMapContainer,
  dashboardCalendarHeatMapHeader,
  dashboardCalendarHeatMapBody,
} from './styles.scss';

/**
 * Renders the DashboardCalendarHeatmapContainer stateless functional component.
 *
 * @param {object} props
 */
const DashboardCalendarHeatmapContainer = props => (
  <div className={dashboardCalendarHeatMapContainer}>
    <div className={dashboardCalendarHeatMapHeader}>
      {props.title}
    </div>
    <div className={dashboardCalendarHeatMapBody}>
      <CalendarHeatmap
        startDate={moment().subtract(2, 'day')}
        endDate={moment().add(365, 'day')}
        values={props.activityItems}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }

          if (!value.count || (value.count >= 0 && value.count <= 3)) {
            return 'color-scale-1';
          } else if (value.count <= 5) {
            return 'color-scale-2';
          } else if (value.count <= 7) {
            return 'color-scale-3';
          } else {
            return 'color-scale-4';
          }
        }}
      />
    </div>
  </div>
);

DashboardCalendarHeatmapContainer.propTypes = {
  activityItems: PropTypes.array,
  title: PropTypes.string,
};

export default DashboardCalendarHeatmapContainer;
