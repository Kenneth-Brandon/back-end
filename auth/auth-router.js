const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');

const Users = require('../users/users-model');

// POST register
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8); // hash a password when registering
  user.password = hash;

  Users.add(user)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST login
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);

        res.status(200).json({
          message: `${token}`,
          user_id: `${user.id}`,
        });
      } else {
        res.status(401).json({ you: 'shall not pass' });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

function signToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
