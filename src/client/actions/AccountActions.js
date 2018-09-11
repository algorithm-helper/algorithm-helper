export const setAuthToken = (authToken = '') => ({
  type: 'SET_AUTH_TOKEN',
  authToken,
});

export const resetAuthToken = () => ({
  type: 'RESET_AUTH_TOKEN',
});
