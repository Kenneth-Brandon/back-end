exports.up = function (knex, Promise) {
  return knex.schema.createTable('recipes', (tbl) => {
    tbl.increments();

    tbl.varchar('title').notNullable();

    tbl.varchar('creator').notNullable();

    tbl.varchar('ingredients', 10000).notNullable();

    tbl.varchar('directions', 10000).notNullable();

    tbl.varchar('category').notNullable();

    tbl
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    tbl.timestamps(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('recipes');
};
