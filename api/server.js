const express = require('express');

const middleware = require('../secrets/middleware');
const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
const recipesRouter = require('../recipes/recipes-router');
const restricted = require('../auth/restricted-middleware');
// const categoriesRouter = require('../categories/categories-router')

const server = express();

middleware(server);

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/recipes', recipesRouter);
// server.use('/api/categories', categoriesRouter)

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'its a go' });
});

module.exports = server;
