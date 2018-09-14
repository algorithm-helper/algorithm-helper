export const setSearchQuery = (searchQuery = '') => ({
  type: 'SET_SEARCH_QUERY',
  searchQuery,
});

export const resetSearchQuery = () => ({
  type: 'RESET_SEARCH_QUERY',
});
