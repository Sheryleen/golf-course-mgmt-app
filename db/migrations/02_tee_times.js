exports.up = function(knex) {
  return knex.schema.createTable("tee_times", function(table) {
    table.increments();
    table.string("time").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tee_times");
};
