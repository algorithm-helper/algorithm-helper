// From Material Design Colors:
const mapColorKeyToColor = {
  0: '#072A60',
  1: '#64B5F6', // Light Blue 300
  2: '#BA68C8', // Purple 300
  3: '#81C784', // Green 300
  4: '#7986CB', // Indigo 300
  5: '#9575CD', // Deep Purple 300
  6: '#4DB6AC', // Teal 300
  7: '#FFB74D', // Orange 300
  8: '#E57373', // Red 300
  9: '#90A4AE', // Blue Grey 300
};

/**
 * Returns the hex color corresponding to the given key, undefined otherwise.
 *
 * @param {string|number} key
 */
const getColorFromKey = key => mapColorKeyToColor[key];

export default getColorFromKey;
