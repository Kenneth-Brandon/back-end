const router = require('express').Router();

const db = require('../database/dbconfig');
const Categories = require('./categories-model.js');

router.get('/', async (req, res) => {
  try {
    const categories = await Categories.getCats();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: 'There was an error.',
    });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('categories')
    .where({ id })
    .first()
    .then((categories) => {
      db('recipes')
        .where({ category_id: id })
        .then((recipes) => {
          categories.recipes = recipes;
          return res.status(200).json(categories);
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Could not retrieve category.',
      });
    });
});

router.get('/:id/recipes', (req, res) => {
  db('categories')
    .join('recipes', 'categories.id', 'recipes.category_id')
    .where({ category_id: req.params.id })
    .select({ category: 'categories.name' }, 'recipes.name', 'recipes.source')
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'There was an error retrieving recipes.',
      });
    });
});

router.post('/', async (req, res) => {
  const cat = req.body;
  if (cat.name) {
    try {
      const addedCat = await Categories.addCat(cat);
      res.status(201).json(addedCat);
    } catch (error) {
      res.status(500).json({
        message: 'Could not add category',
      });
    }
  } else {
    res.status(400).json({
      message: 'Name of category is required',
    });
  }
});

module.exports = router;
