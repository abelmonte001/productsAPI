require("util").inspect.defaultOptions.depth = null;
const pool = require('./dbconnector');

const getProducts = (page, count, callback) => {
  let queryStr = `SELECT product.id, product.name, product.slogan, product.description, product.category,
  product.default_price
  FROM productinfo.product
  LIMIT ${count};`

  pool.query(queryStr)
  .then(data => {
    callback(null, data.rows);
  })
  .catch(err => {
    callback(err, null);
  })
}


module.exports = getProducts;