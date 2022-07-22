const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const responseTime = require('response-time');
const getOneProductStyles = require('./db/getOneProductStyles');
const getOneProduct = require('./db/getOneProduct');
const getProducts = require('./db/getProducts');
const path = require('path');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseTime());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});


app.get("/products", (req, res) => {
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  getProducts(page, count, (err, data) => {
    if (err) {
      res.status(500).send('error fetching products');
    } else {
      res.status(200).send(JSON.stringify(data))
    }
  }
  );
});


app.get('/products/:product_id', (req, res) => {
  let id = req.params.product_id;
  getOneProduct(id, (err, data) => {
    if (err) {
      console.log(data);
      res.status(500).send('failed to fetch');
    } else {
      let newObj = {
        id: data[0]['id'],
        name:data[0]['name'],
        slogan: data[0]['slogan'],
        description:data[0]['description'],
        category: data[0]['category'],
        default_price: data[0]['default_price'],
        features: []
      };
      let tempfeature = data[0]['feature'];
      for (let i = 0; i < tempfeature.length; i++) {
        let tempObj = {feature: data[0]['feature'][i], value: data[0]['value'][i]};
        newObj['features'].push(tempObj);
      };
      res.status(200).send(JSON.stringify(newObj));
    }
  });
});

app.get('/products/:product_id/styles', (req, res) => {
  let id = req.params.product_id;
  getOneProductStyles(id, (err, data) => {
    if (err) {
      console.log(data);
      res.status(500).send('failed to fetch');
    } else {
      let returnObj = {
        product_id: id,
        results: []
      }
      for(let i = 0; i < data.length; i++) {
        let tempObj = {
          style_id : data[i]['id'],
          name: data[i]['name'],
          original_price: data[i]['original_price'],
          sale_price: data[i]['sale_price'],
          'default?': data[i]['default'],
          photos: [],
          skus: [],
        }
        let urls = [];
        for(let j = 0; j < data[i]['url'].length; j++) {
          if(!urls.includes(data[i]['url'][j])) {
            urls.push(data[i]['url'][j]);
            let tempPhoto = {
              thumbnail_url: data[i]['thumbnail_url'][j],
              url: data[i]['url'][j]
            }
            tempObj.photos.push(tempPhoto);
          }
        }
        let skus = [];
        for(let k = 0; k < data[i]['sku'].length; k++) {
          if(!skus.includes(data[i]['sku'][k])) {
            skus.push(data[i]['sku'][k])
            let tempSku = {}
            tempSku[data[i]['sku'][k]] = {
              quantity: data[i]['quantity'][k],
              size: data[i]['size'][k]
            }
            tempObj.skus.push(tempSku);
            // console.log('look at me adding skus')
          }
        }
        returnObj.results.push(tempObj);
      }

      res.status(200).send(JSON.stringify(returnObj));
    }
  });
});

app.get('/loaderio-ed77d2c72d7fa83f74fef21c9e1d1261', async (req, res) => {
  var options = {
    root: path.join(__dirname)
  };

  var fileName = 'loaderio-ed77d2c72d7fa83f74fef21c9e1d1261.txt';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});






module.exports = app;