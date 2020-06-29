const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('GET/', () => {
    it('should return status code 200 its a go', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    });

    it('should return JSON', async () => {
      const res = await request(server).get('/');
      expect(res.type).toBe('application/json');
    });

    it('should return { api: "Server running for BW project!" }', async () => {
      const res = await request(server).get('/');
      expect(res.body).toEqual({
        api: 'Server running for BW project!',
      });
    });
  });
});
