const db = require('../database/dbconfig');

module.exports = {
  add,
  findBy,
  findByUsername,
  getUsersRecipes,
  getUsersById,
};

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return getUsersById(id);
}

function findByUsername(username) {
  return db('users').where(username).first();
}

function getUsersById(id) {
  return db('users').where({ id }).first();
}

function getUsersRecipes(id) {
  return db('recipes as r')
    .select(
      'r.id',
      'r.title',
      'r.creator',
      'r.ingredients',
      'r.directions',
      'r.category'
    )
    .where('r.user_id', id)
    .orderBy('r.user_id', id);
}
