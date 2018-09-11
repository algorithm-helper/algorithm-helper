const defaultState = {
  authToken: '',
  isLoggedIn: false,
};

const accountReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_AUTH_TOKEN':
      return {
        ...state,
        authToken: action.authToken,
        isLoggedIn: true,
      };
    case 'RESET_AUTH_TOKEN':
      return {
        ...state,
        authToken: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default accountReducer;
