const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/auth-middleware.js');
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

server.use('/api/auth', logger, authRouter);
server.use('/api/recipes', logger, authenticate, recipeRouter);

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
