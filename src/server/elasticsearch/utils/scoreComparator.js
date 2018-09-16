/**
 * Comparator used to sort search results by score in descending order.
 *
 * @param {object} a
 * @param {object}} b
 */
const scoreComparator = (a, b) => b.score - a.score;

module.exports = scoreComparator;
