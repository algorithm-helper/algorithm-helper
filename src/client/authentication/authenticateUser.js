import { setAuthToken, resetAuthToken } from 'actions/AccountActions';

import { AUTH_TOKEN_KEY } from './localStorageConstants';

/**
 * Trys to authenticate the user by looking up if there exists an auth token in localStorage. If it
 * exists, it makes a request to the server to check that it is valid, otherwise it removes it
 * from localStorage, as it has become invalid.
 *
 * @param {Store} store
 */
const authenticateUser = store => {
  const authToken = localStorage[AUTH_TOKEN_KEY];
  if (authToken) {
    return new Promise((resolve, reject) => fetch('/accounts/user', {
      method: 'POST',
      headers: {
        'X-Auth': authToken,
      },
    })
      .then(result => result.json())
      .then(result => {
        if (result.error) {
          throw result;
        }

        store.dispatch(setAuthToken(authToken));
        resolve(result);
      })
      .catch(err => {
        // Default authentication was an error so just reset the authentication token in
        // localStorage and reset it in redux:
        localStorage.setItem(AUTH_TOKEN_KEY, '');
        store.dispatch(resetAuthToken());
        reject(err);
      }));
  }

  store.dispatch(resetAuthToken());
  return Promise.resolve(true);
};

export default authenticateUser;
