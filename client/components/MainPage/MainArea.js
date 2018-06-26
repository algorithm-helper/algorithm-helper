import React from 'react';
import PropTypes from 'prop-types';

// Components:
import MainAreaCardContainer from './MainAreaCardContainer';
import MainAreaCard from './MainAreaCard';
import MainAreaNoResults from './MainAreaNoResults';

// Utils:
import i18n from '../../utils/i18n';

class MainArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      visibleCardData: '',
    };
    this.handleSearchQuery = this.handleSearchQuery.bind(this);
  }

  componentWillMount() {
    this.setState({ visibleCardData: this.props.cardData });
  }

  handleSearchQuery(e) {
    const searchQuery = e.target.value.trim().replace(/\s/g, '').toLowerCase();
    this.setState({ searchQuery });
    this.setState({
      visibleCardData: this.props.cardData.filter(item =>
        item.title.toLowerCase().replace(/\s/g, '').includes(searchQuery) ||
        item.pillText.toLowerCase().replace(/\s/g, '').includes(searchQuery)
      )
    });
  }

  render() {
    return (
      <div className="container main-area">
        <div className="row">
          <div className="col-md-12">
            <div className="main-area-search-container">
              <form className="form-inline md-form form-sm main-area-search-form">
                <i className="fa fa-search main-area-search-icon" aria-hidden="true"></i>
                <input
                  className="form-control form-control-sm ml-3 w-75 main-area-search-bar"
                  type="text"
                  placeholder={i18n.mainArea.searchPlaceholder['en']}
                  aria-label="Search"
                  autoComplete="off"
                  onChange={this.handleSearchQuery}
                />
              </form>
            </div>
          </div>
        </div>

        <MainAreaCardContainer>
          {
            this.state.visibleCardData.length > 0 ?
            this.state.visibleCardData.map((item, i) => <MainAreaCard key={i} {...item} /> ) :
            <MainAreaNoResults
              title={i18n.mainAreaNoSearchResults.title['en']}
              subtitle={i18n.mainAreaNoSearchResults.subtitle['en']}
            />
          }
        </MainAreaCardContainer>
      </div>
    );
  }
}

MainArea.propTypes = {
  cardData: PropTypes.array.isRequired,
};

export default MainArea;
