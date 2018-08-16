/**
 * Express middleware to set correct headers to provide cross-origin resource sharing (CORS)
 * support.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

module.exports = cors;
