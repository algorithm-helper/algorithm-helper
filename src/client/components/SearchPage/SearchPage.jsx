import React from 'react';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: '',
    };
  }

  render() {
    return (
      <div>
        <h1>Search Page</h1>
      </div>
    );
  }
}

SearchPage.propTypes = {};

export default SearchPage;
