exports.up = function (knex, Promise) {
  return knex.schema.createTable('recipes', (tbl) => {
    tbl.increments();

    tbl.string('title').notNullable();

    tbl.string('creator').notNullable();

    tbl.string('ingredients').notNullable();

    tbl.string('directions').notNullable();

    tbl.string('category').notNullable();

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
