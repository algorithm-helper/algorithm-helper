const mapColorKeyToColor = {
  0: '#072A60',
  1: '#33B5E5',
  2: '#AA66CC',
  3: '#81C784',
  4: '#F06292',
  5: '#7986CB',
  6: '#4DB6AC',
  7: '#FFB74D',
  8: '#E57373',
  9: '#90A4AE',
};

/**
 * Returns the HEX color corresponding to the given key, undefined otherwise.
 *
 * @param {string|number} key
 */
const getColorFromKey = key => {
  return mapColorKeyToColor[key];
};

export default getColorFromKey;
