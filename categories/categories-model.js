const db = require('../data/dbConfig');

module.exports = {
  getCats,
  getCatById,
  addCat,
};

function getCats() {
  return db('categories');
}

function getCatById(id) {
  return db('categories').where({ id }).first();
}

async function addCat(category) {
  const [id] = await db('categories').insert(category, 'id');
  return db('categories').where({ id }).first();
}
