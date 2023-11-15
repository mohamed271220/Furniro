const request = require('supertest');
const expect = require('chai').expect;
const app = require('../index.js'); // path to your Express app

describe('Product API', function () {
    describe('GET /products', function () {
        it('should return all products', function (done) {
            request(app)
                .get('/products')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body.products).to.be.an('array');
                    done();
                });
        });

        it('should return a maximum of max products', function (done) {
            request(app)
                .get('/products?max=2')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body.products).to.be.an('array').that.has.lengthOf.at.most(2);
                    done();
                });
        });

        it('should return products that match the search query', function (done) {
            request(app)
                .get('/products?search=test')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body.products).to.be.an('array');
                    done();
                });
        });
    });

    describe('GET /products/:productId', function () {
        it('should return the product with the given id', function (done) {
            const testProductId = '60d6ec9f1097b31b2bbefd40'; 
            request(app)
                .get(`/products/${testProductId}`)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body._id).to.equal(testProductId);
                    done();
                });
        });

        it('should return 404 for non-existing product id', function (done) {
            const nonExistingProductId = '60d6ec9f1097b31b2bbefd99'; // replace with a non-existing product id
            request(app)
                .get(`/products/${nonExistingProductId}`)
                .expect(404, done);
        });
    });
});