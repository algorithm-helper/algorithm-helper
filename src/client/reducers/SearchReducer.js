const defaultState = '';

const searchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return action.searchQuery;
    case 'RESET_SEARCH_QUERY':
      return '';
    default:
      return state;
  }
};

export default searchReducer;
