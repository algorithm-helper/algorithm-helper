import { setAuthToken, resetAuthToken } from 'actions/AccountActions';

import { AUTH_TOKEN_KEY } from './localStorageConstants';

/**
 * Handles the setting of the authentication token in both the localStorage and in the redux
 * store to keep these in sync.
 *
 * @param {string} authToken
 * @param {Function} dispatch
 */
const handleAuthToken = (authToken, dispatch) => {
  if (authToken) {
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    dispatch(setAuthToken(authToken));
    return true;
  }

  localStorage.setItem(AUTH_TOKEN_KEY, '');
  dispatch(resetAuthToken());
  return false;
};

export default handleAuthToken;
