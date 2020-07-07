const Users = require('./users-model.js');
const db = require('../database/dbconfig');

describe('users model', () => {
  describe('add', () => {
    it('should add a new user to the db', async () => {
      await Users.add({ username: 'marie.brandon', password: 'password' });

      const users = await db('users');
      expect(users).toHaveLength(1);
    });

    beforeEach(async () => {
      await db('users').truncate();
    });
  });

  describe('find', () => {
    it('should find all the users', async () => {
      let users = await Users;
    });
  });
});
