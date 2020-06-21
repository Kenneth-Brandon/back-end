exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        { id: 1, username: 'Priya.Vaidya', password: 'password1' },
        { id: 2, username: 'Kenneth.Brandon', password: 'password2' },
        { id: 3, username: 'Ryan.Paulson', password: 'password3' },
        { id: 4, username: 'Doug.Little', password: 'password4' },
        { id: 5, username: 'Nasha.Gladney', password: 'password5' },
        { id: 6, username: 'Allison.Castaneda', password: 'password6' },
      ]);
    });
};
