exports.up = function (knex) {
  return knex.schema.createTable('users', (users) => {
    users.increments();
    users.varchar('name');
    users.varchar('email').unique();
    users.varchar('username', 500).notNullable().unique();
    users.varchar('password', 500).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
