const router = require('express').Router();

const restricted = require('../auth/restricted-middleware');

const Recipes = require('./recipes-model.js');

router.get('/', restricted, async (req, res) => {
  try {
    const recipes = await Recipes.getAllRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'An error occured while trying to retrieve recipes',
    });
  }
});

router.get('/:id/users', restricted, async (req, res) => {
  try {
    const userRecipes = await Recipes.getRecipeByUserId(req.params.id);
    if (userRecipes) {
      res.status(200).json(userRecipes);
    } else {
      res.status(404).json({ message: 'Cannot find requested recipes' });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'The user recipes could not be retrieved.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipes.getRecipeById(req.params.id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: 'Cannot find requested recipe' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'The recipe could not be retrieved.' });
  }
});

router.post('/', restricted, async (req, res) => {
  const recipe = req.body;
  console.log('Adding recipe.', recipe);
  if (recipe.title != null) {
    try {
      const addedRec = await Recipes.addRecipe(recipe);
      res.status(201).json(addedRec);
    } catch (error) {
      res.status(500).json({ message: 'Error adding recipe' });
    }
  } else {
    console.log(error);
    res.status(400).json({ message: 'Error. Provide name for recipe' });
  }
});

router.delete('/:id', restricted, async (req, res) => {
  try {
    const count = await Recipes.removeRecipe(req.params.id);
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Recipe deleted' });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'There was an error while attempting to remove that recipe',
      });
  }
});

router.put('/:id', restricted, async (req, res) => {
  const changes = req.body;
  if (changes) {
    try {
      const updated = await Recipes.updateRecipe(req.params.id, changes);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: 'That recipe does not exist' });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'There was an error while trying to update the recipe',
        });
    }
  } else {
    res.status(400).json({ message: 'Name of recipe is required' });
  }
});

router.get('/search', async (req, res) => {
  console.log('Received search request', req.body.search);
  try {
    const recipe = await Recipes.getRecipeByName(req.body.search, req.body.id);
    console.log(req.body.search);
    console.log(req.body.id);
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Bad search term.', error: error });
  }
});

module.exports = router;
