const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/auth-middleware.js'); // will put on recipeRouter
const authRouter = require('../auth/auth-router.js');
const recipeRouter = require('../recipes/recipe-router.js');
const server = express();

server.use(logger);
server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`server running for BW project!`);
});

server.use('/api/auth', authRouter);
server.use('/api/recipes', authenticate, recipeRouter);

// custom middleware for logger
function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl}`);

  next();
}

module.exports = server;
