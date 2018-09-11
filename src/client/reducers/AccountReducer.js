const defaultState = {};

const accountReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_AUTH_TOKEN':
      return {
        ...state,
        authToken: action.authToken,
      };
    case 'RESET_AUTH_TOKEN':
      return {
        ...state,
        authToken: null,
      };
    default:
      return state;
  }
};

export default accountReducer;
