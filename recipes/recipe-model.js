const db = require('../database/dbconfig');

module.exports = {
  getAllRecipes,
  getById,
  // insert,
  addRecipe,
  update,
  remove,
};

function getAllRecipes() {
  return db('recipes as r')
    .select(
      'r.id',
      'r.title',
      'r.creator',
      'r.ingredients',
      'r.directions',
      'r.category',
      'r.user_id'
    )
    .join('users as u', 'r.user_id', '=', 'u.id')
    .orderBy('r.user_id');
}

function getById(id) {
  return db('recipes').where({ id }).first();
}

// function insert(recipe) {
//   return db('recipes')
//     .insert(recipe, 'id')
//     .then((ids) => {
//       const [id] = ids;

//       return db('recipes').where({ id }).first();
//     });
// }

async function addRecipe(recipe) {
  const [id] = await db('recipes').insert(recipe, 'id');
  return db('recipes').where({ id }).first();
}

function update(id, changes) {
  return db('recipes')
    .where('id', id)
    .update(changes)
    .then((count) => {
      if (count > 0) {
        return getById(id);
      }
    });
}

function remove(id) {
  let deletedRecipe = {};
  db('recipes')
    .where({ id })
    .first()
    .then((recipe) => {
      deletedRecipe = recipe;
    });
  return db('recipes')
    .where('id', id)
    .del()
    .then((count) => {
      if (count > 0) {
        return deletedRecipe;
      }
    });
}
