const express = require('express');
const router = express.Router();
const db = require('../recipes/recipe-model.js');

const Users = require('../users/users-model.js');
const Recipes = require('./recipe-model.js');

// GET all recipes
router.get('/', (req, res) => {
  Recipes.getAllRecipes()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errMessage: 'Failed to get recipes, sorry!' });
    });
});

// POST new recipe for a user
router.post('/:id/user', validateRecipe, (req, res) => {
  const id = req.params.id;
  req.body.user_id = id;
  const recipeData = req.body;

  Recipes.insert(recipeData)
    .then((brandNewRecipe) => {
      res.status(200).json({ brandNewRecipe });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'There was an error while saving to the database' });
    });
});

// GET recipe by id
router.get('/:id', validateRecipeId, (req, res) => {
  const recipeID = req.params.id;

  db.getById(recipeID)
    .then((specificRec) => {
      if (specificRec) {
        res.status(200).json(specificRec);
      } else {
        res.status(500).json({
          error: 'No recipe with that ID',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The recipe information could not be retrieved' });
    });
});

// GET recipes for a specific user
router.get('/:id/user', validateUserId, (req, res) => {
  const id = req.params.id;

  Users.getUsersRecipes(id)
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((err) => {
      res.status(500).json({ errMessage: 'Failed to get recipes' });
    });
});

// PUT a specific recipe
router.put('/:id', validateRecipeId, (req, res) => {
  const id = req.params.id;
  const recipeData = req.body;

  Recipes.update(id, recipeData)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'The recipe could not be modified' });
    });
});

// DELETE a specific recipe
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Recipes.remove(id).then((deleted) => {
    if (deleted) {
      res.status(200).json({ deleted });
    } else {
      res.status(404).json({ error: 'Failed to delete post' });
    }
  });
});

// CUSTOM MIDDLEWARE
function validateRecipe(req, res, next) {
  const data = req.body;
  if (!data) {
    res.status(400).json({ error: 'missing required fields' });
  } else if (!data.title) {
    res.status(400).json({ error: 'missing required title' });
  } else if (!data.ingredients) {
    res.status(400).json({ error: 'missing required ingredients' });
  } else if (!data.directions) {
    res.status(400).json({ error: 'missing required directions' });
  } else if (!data.category) {
    res.status(400).json({ error: 'missing required category' });
  } else if (!data.user_id) {
    res.status(400).json({ error: 'missing required user_id' });
  } else {
    next();
  }
}

function validateRecipeId(req, res, next) {
  const recipeID = Number(req.params.id);
  if (typeof recipeID === 'number') {
    next();
  } else {
    res.status(404).json({
      message: 'The recipe with the specific ID does not exist',
    });
  }
}

function validateUserId(req, res, next) {
  const id = req.params.id;
  Users.getUsersById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: 'invalid user id' });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: 'The user information could not be retrieved.' });
    });
}

module.exports = router;
