const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    next();
  } else if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ errorMessage: 'Sorry, no access' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ errorMessage: 'Sorry, no access' });
  }
};
