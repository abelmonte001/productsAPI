require("util").inspect.defaultOptions.depth = null;
const pool = require('./dbconnector');

const getOneProductStyles = (id, callback) => {
  let allProducts = [];
  let product_id =  id;
  let queryStr = `select styles.id, styles.product_id, styles.name, styles.original_price, styles.sale_price, styles.default,
  array_agg(photos.thumbnail_url) AS thumbnail_url, array_agg(photos.url) AS url, array_agg(sku.id) AS Sku, array_agg(sku.size) AS size, array_agg(sku.quantity) AS quantity
  from productinfo.styles
  LEFT JOIN productinfo.photos
  ON styles.id = photos.style_id
  LEFT JOIN productinfo.sku
  ON styles.id = sku.style_id
  WHERE styles.product_id= ${id} GROUP BY styles.id, styles.product_id, styles.name, styles.original_price, styles.sale_price, styles.default
  `;

  pool.query(queryStr)
  .then(data => {
    callback(null, data.rows);
  })
  .catch(err => {
    console.log(err);
    callback(err, null);
  })
}


module.exports = getOneProductStyles;