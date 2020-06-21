exports.up = function (knex, Promise) {
  return knex.schema.createTable('recipes', (tbl) => {
    tbl.increments();

    tbl.text('title').notNullable();

    tbl.text('creator').notNullable();

    tbl.text('ingredients', 10000).notNullable();

    tbl.text('directions', 10000).notNullable();

    tbl.text('category').notNullable();

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
