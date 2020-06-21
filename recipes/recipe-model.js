const db = require('../database/dbconfig');
const mappers = require('./mappers');

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  removeRecipe,
  updateRecipe,
  getRecipeByUserId,
  findBy,
  getRecipeByName,
};

function getAllRecipes() {
  return db('recipes').select(
    'recipes.id',
    'recipes.title',
    'recipes.source',
    'recipes.instructions',
    'recipes.category',
    'recipes.ingredients',
    'recipes.user_id'
  );
}

function getRecipeById(id) {
  return db('recipes')
    .where({ 'recipes.id': id })
    .first()
    .select(
      'recipes.id',
      'recipes.title',
      'recipes.source',
      'recipes.instructions',
      'recipes.category',
      'recipes.ingredients'
    );
}

function getRecipeByUserId(userId) {
  return (
    db('recipes')
      .where('user_id', userId)
      // .first()
      // .select(
      //     'recipes.id',
      //     'recipes.title',
      //     'recipes.source',
      //     'recipes.instructions',
      //     'recipes.category',
      //     'recipes.ingredients'
      // )
      .then((recipes) => recipes.map((recipe) => mappers.recipeToBody(recipe)))
  );
}

async function addRecipe(recipe) {
  const [id] = await db('recipes').insert(recipe, 'id');
  return db('recipes').where({ id }).first();
}

function removeRecipe(id) {
  return db('recipes').where({ id }).del();
}

function updateRecipe(id, changes) {
  return db('recipes').where({ id }).update(changes);
}

function findBy(filter) {
  return db('recipes').where(filter);
}

function getRecipeByName(searchString, user_id) {
  searchString = '%' + searchString + '%';
  console.log('Searching for', searchString);
  console.log('User id', user_id);
  return db('recipes')
    .where((builder) =>
      builder
        .where('category', 'like', searchString)
        .orWhere('title', 'like', searchString)
    )
    .andWhere({ user_id: user_id });
}
