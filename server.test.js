const request = require("supertest");
const app = require("./app");

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe('test get products', () => {
  test('response from get request', () => {
    return request(app)
    .get('/products')
    .query({
      page: 1,
      count: 10,
      product_id: 1
    })
    .expect(200);
  });
});

describe('test get 1 product', () => {
  test('response from get request', () => {
    return request(app)
    .get('/products/1')
    .query({
      product_id: 1
    })
    .expect(200);
  });
});

describe('test get 1 product with styles', () => {
  test('response from get request', () => {
    return request(app)
    .get('/products/1/styles')
    .query({
      product_id: 1
    })
    .expect(200);
  });
});

