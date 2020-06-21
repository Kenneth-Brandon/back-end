const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');
const tokenService = require('./token-service');

router.post('/register', async (req, res) => {
  try {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    const newuser = await Users.addUser(user);
    console.log(newuser);
    const token = tokenService.generateToken(newuser);
    res
      .status(201)
      .json({ message: 'User created', id: newuser.id, token: token });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);
        res.status(200).json({
          message: `Successfully logged into ${user.username}!`,
          token,
          id: user.id,
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Could not find user' });
    });
});

module.exports = router;
