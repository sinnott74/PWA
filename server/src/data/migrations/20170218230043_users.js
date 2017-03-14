
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function(tbl) {
    tbl.increments().primary();
    tbl.string('username', 30).notNullable();
    tbl.string('password', 60).notNullable();
    tbl.string('firstname', 30).notNullable();
    tbl.string('lastname', 30).notNullable();
    tbl.date('dob').notNullable();

    tbl.unique('username');

    tbl.index('username', 'idx_username');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
