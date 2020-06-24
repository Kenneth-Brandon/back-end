const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/auth-middleware');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get('/:id', restricted, (req, res) => {
  Users.getUsersById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => res.send(error));
});

module.exports = router;
