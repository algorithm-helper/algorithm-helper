const ColorThemeReducerDefaultState = 'main';

export default (state = ColorThemeReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_COLOR':
      return action.colorKey;
    case 'RESET_COLOR':
      return 0;
    default:
      return state;
  }
};
