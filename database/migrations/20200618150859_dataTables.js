exports.up = function (knex) {
  return knex.schema
    .createTable('users', (tbl) => {
      tbl.increments();
      tbl.varchar('name');
      tbl.varchar('email').unique();
      tbl.varchar('username', 50).notNullable().unique();
      tbl.varchar('password', 50).notNullable();
    })

    .createTable('recipes', (tbl) => {
      tbl.increments();
      tbl.varchar('title', 100).notNullable().index();
      tbl.varchar('creator').index();
      tbl.varchar('ingredients', 10000).notNullable();
      tbl.varchar('directions', 10000).notNullable();
      tbl.varchar('category', 30).notNullable().index();
      // foreign key
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('recipes').dropTableIfExists('users');
};
