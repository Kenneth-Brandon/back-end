const request = require('supertest');
const server = require('../api/server');

describe('recipe-router', function () {
  describe('test environment', function () {
    it('should use the testing environment', function () {
      expect(process.env.DB_ENV).toBe('testing');
    });
  });

  // test the POST for adding a new recipe
  describe('POST /:id/user', function () {
    it('should create new recipe', function () {
      return request(server)
        .post('/api/recipes/:id/user')
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });

  // test the GET for getting a recipe by id
  describe('GET /:id', function () {
    it('should get recipe by id', function () {
      return request(server)
        .get('/api/recipes/:id')
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });

  // test the GET for getting a specific users recipes
  describe('GET /:id/user', function () {
    it('should get recipes for a specific user', function () {
      return request(server)
        .get('/api/recipes/:id/user')
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });

  // test the PUT for editing a recipe
  describe('PUT /:id', function () {
    it('should edit a specific recipe', function () {
      return request(server)
        .put('/api/recipes/:id')
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });

  // test the DELETE for deleting a recipe
  describe('DELETE /:id', function () {
    it('should delete a specific recipe', function () {
      return request(server)
        .delete('/api/recipes/:id')
        .then((res) => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});
