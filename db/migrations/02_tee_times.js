exports.up = function(knex) {
  return knex.schema.createTable("tee_times", function(table) {
    table.increments();
    table.datetime("time").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("tee_times");
};
