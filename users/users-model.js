const db = require('../data/dbConfig');

module.exports = {
  addUser,
  find,
  findBy,
  findById,
  remove,
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users').select('id', 'username').where({ id }).first();
}

async function addUser(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function remove(id) {
  return db('users').where({ id }).del();
}
