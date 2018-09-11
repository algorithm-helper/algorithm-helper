const defaultState = 0;

const colorThemeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_COLOR':
      return action.colorKey;
    case 'RESET_COLOR':
      return 0;
    default:
      return state;
  }
};

export default colorThemeReducer;
