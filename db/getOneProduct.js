require("util").inspect.defaultOptions.depth = null;
const pool = require('./dbconnector');

const getOneProduct = (id, callback) => {
  let allProducts = [];
  let product_id =  id;
  let queryStr = `SELECT product.id, product.name, product.slogan, product.description, product.category,
  product.default_price, array_agg(features.feature) AS feature, array_agg(features.value) AS Value
  FROM productinfo.product
  LEFT JOIN productinfo.features
  ON product.id = features.product_id
  WHERE product.id = ${id} GROUP BY product.id;`;

  pool.query(queryStr)
  .then(data => {
    callback(null, data.rows);
  })
  .catch(err => {
    callback(err, null);
  })
}


module.exports = getOneProduct;