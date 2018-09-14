import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Doughnut } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { Col, Container, Row } from 'reactstrap';

import { noop } from 'utils/utils';

import {
  dashboardProgressContainer,
  dashboardProgressHeader,
  dashboardProgressBody,
  dashboardProgressItem,
} from './styles.scss';

const materialUIStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class DashboardProgressContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      uncompleted: 0,
      completed: 0,
      topicItemCountMapping: null,
      completedItemsMapping: null,
      categoriesData: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const { topicItemCountMapping, completedItemsMapping } = this.props;

    this.setState({
      topicItemCountMapping,
      completedItemsMapping,
      uncompleted: topicItemCountMapping.total - completedItemsMapping.total,
      completed: completedItemsMapping.total,
    });
    this.requestCategoriesData();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      topicItemCountMapping: newProps.topicItemCountMapping,
      completedItemsMapping: newProps.completedItemsMapping,
    });
  }

  /**
   * Requests for the categories data from the server, and only keeps the key and the title.
   */
  requestCategoriesData = () => {
    fetch('/data/categories')
      .then(result => result.json())
      .then(result => {
        const categoriesData = result.data.map(elem => ({
          key: elem.key,
          title: elem.title,
        }));
        this.setState({ categoriesData });
      })
      .catch(noop);
  };

  /**
   * Returns the percentage given number.
   *
   * @param {number} num
   */
  getPercentage = num => {
    const total = this.state.uncompleted + this.state.completed;
    if (total === 0) {
      return '0%';
    }
    return `${Math.round((num / total) * 100)}%`;
  }

  /**
   * Creates the data for the Chart.js Doughnut chart.
   *
   * @param {number} uncompleted
   * @param {number} completed
   */
  createData = (uncompleted, completed) => {
    let data;
    if (!uncompleted && !completed) {
      data = [1, 0];
    } else {
      data = [uncompleted, completed];
    }

    return {
      labels: [
        'Uncompleted',
        'Completed',
      ],
      datasets: [{
        data,
        backgroundColor: [
          '#BDBDBD',
          '#66BB6A',
        ],
        hoverBackgroundColor: [
          '#BDBDBD',
          '#66BB6A',
        ],
      }],
    };
  }

  /**
   * Handles changes to the Select component.
   *
   * @param {Event} evt
   */
  onSelectChange = evt => {
    this.setState({ selected: evt.target.value });

    if (this.state.topicItemCountMapping && this.state.completedItemsMapping) {
      const key = evt.target.value || 'total';
      const completed = this.state.completedItemsMapping[key] || 0;

      this.setState({
        uncompleted: this.state.topicItemCountMapping[key] - completed,
        completed,
      });
    }
  };

  /**
   * Renders the DashboardProgressContainer component.
   */
  render() {
    const { classes } = this.props;
    return (
      <Container className={dashboardProgressContainer} fluid>
        <Row>
          <Col md="6" sm="6" xs="6">
            <Doughnut
              data={this.createData(this.state.uncompleted, this.state.completed)}
              height={250}
            />
          </Col>
          <Col md="6" sm="6" xs="6">
            <div>
              <div className={dashboardProgressHeader}>
                Your Progress
              </div>
              <div className={dashboardProgressBody}>
                <div className={dashboardProgressItem}>
                  <div style={{ float: 'left' }}>Completed</div>
                  <div style={{ float: 'right' }}>
                    { this.getPercentage(this.state.completed) }
                  </div>
                  <div style={{ clear: 'both' }} />
                </div>
                <div className={dashboardProgressItem}>
                  <div style={{ float: 'left' }}>Uncompleted</div>
                  <div style={{ float: 'right' }}>
                    { this.getPercentage(this.state.uncompleted) }
                  </div>
                  <div style={{ clear: 'both' }} />
                </div>

                <FormControl className={classes.formControl}>
                  <Select
                    value={this.state.selected}
                    onChange={this.onSelectChange}
                    name="selected"
                    displayEmpty
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="">
                      <em>Total</em>
                    </MenuItem>
                    {
                      this.state.categoriesData
                      && (
                        this.state.categoriesData.map((category, i) => (
                          <MenuItem key={i} value={category.key}>
                            {category.title}
                          </MenuItem>
                        ))
                      )
                    }
                  </Select>
                </FormControl>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

DashboardProgressContainer.propTypes = {
  topicItemCountMapping: PropTypes.object,
  completedItemsMapping: PropTypes.object,
};

export default compose(
  withStyles(materialUIStyles),
)(DashboardProgressContainer);
