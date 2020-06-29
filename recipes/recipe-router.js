const express = require('express');
const router = express.Router();

const Recipes = require('./recipe-model');
const Users = require('../users/users-model');

// GET all recipes
router.get('/', (req, res) => {
  Recipes.getAllRecipes()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Failed to get recipes, sorry!' });
    });
});

// POST new recipe for a user
router.post('/:id/user', validateRecipe, (req, res) => {
  const id = req.params.id;
  req.body.user_id = id;
  const recipeData = req.body;

  Recipes.addRecipe(recipeData)
    .then((brandNewRecipe) => {
      res
        .status(201)
        .json({ brandNewRecipe, message: 'Recipe added successfully!' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: 'There was an error while saving to the database',
      });
    });
});

// GET recipe by id
router.get('/:id', validateRecipeId, (req, res) => {
  const recipeID = req.params.id;

  Recipes.getById(recipeID)
    .then((specificRec) => {
      if (specificRec) {
        res.status(200).json(specificRec);
      } else {
        res.status(500).json({
          errorMessage: 'No recipe with that ID',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: 'The recipe information could not be retrieved',
      });
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
      res.status(500).json({ errorMessage: 'Failed to get recipes' });
    });
});

// PUT a specific recipe
router.put('/:id', validateRecipeId, (req, res) => {
  const id = req.params.id;
  const recipeData = req.body;

  Recipes.update(id, recipeData)
    .then((updatedRecipe) => {
      if (updatedRecipe) {
        res.status(200).json({
          message: 'Recipe updated',
        });
      } else {
        res.status(404).json({
          errorMessage: 'Recipe not found',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: 'The recipe could not be modified' });
    });
});

// DELETE a specific recipe
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Recipes.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({ message: 'Recipe deleted' });
      } else {
        res.status(404).json({ errorMessage: 'Recipe not found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: "Couldn't delete recipe",
      });
    });
});

// CUSTOM MIDDLEWARE
function validateRecipe(req, res, next) {
  const data = req.body;
  if (!data) {
    res.status(400).json({ errorMessage: 'Missing required fields' });
  } else if (!data.title) {
    res.status(400).json({ errorMessage: 'Missing required title' });
  } else if (!data.ingredients) {
    res.status(400).json({ errorMessage: 'Missing required ingredients' });
  } else if (!data.directions) {
    res.status(400).json({ errorMessage: 'Missing required directions' });
  } else if (!data.category) {
    res.status(400).json({ errorMessage: 'Missing required category' });
  } else if (!data.user_id) {
    res.status(400).json({ errorMessage: 'Missing required user_id' });
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
      errorMessage: 'The recipe with the specific ID does not exist',
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
        res.status(404).json({ errorMessage: 'Invalid user id' });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: 'The user information could not be retrieved.' });
    });
}

module.exports = router;
