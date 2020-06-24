const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        { username: 'Priya.Vaidya', password: bcrypt.hashSync('password', 10) },
        {
          username: 'Kenneth.Brandon',
          password: bcrypt.hashSync('password', 10),
        },
        { username: 'Ryan.Paulson', password: bcrypt.hashSync('password', 10) },
        { username: 'Doug.Little', password: bcrypt.hashSync('password', 10) },
        {
          username: 'Nasha.Gladney',
          password: bcrypt.hashSync('password', 10),
        },
        {
          username: 'Allison.Castaneda',
          password: bcrypt.hashSync('password', 10),
        },
      ]);
    });
};
