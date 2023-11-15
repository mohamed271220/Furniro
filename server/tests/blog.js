const request = require('supertest');
const expect = require('chai').expect;
const app = require('../index'); // path to your Express app

describe('Blog API', function() {
  describe('GET /posts', function() {
    it('should return all posts', function(done) {
      request(app)
        .get('/posts')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body.posts).to.be.an('array');
          done();
        });
    });

    it('should return posts that match the search query and tag', function(done) {
      request(app)
        .get('/posts?search=test&tag=test')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body.posts).to.be.an('array');
          done();
        });
    });
  });
});