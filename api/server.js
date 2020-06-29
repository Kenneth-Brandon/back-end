const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/auth-middleware');
const authRouter = require('../auth/auth-router');
const recipeRouter = require('../recipes/recipe-router');
const userRouter = require('../users/users-router');

const server = express();

server.use(logger);
server.use(cors());
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send({ api: `Server running for BW project!` });
});

server.use('/api/auth', logger, authRouter);
server.use('/api/recipes', logger, authenticate, recipeRouter);
server.use('/api/users', logger, authenticate, userRouter);

//custom middleware
function logger(req, res, next) {
  console.log(`
  {
      method: ${req.method},
      url: ${req.url},
      timestamp: ${new Date().toLocaleString()}
  }
  `);
  next();
}

module.exports = server;
