exports.up = function(knex) {
  return knex.schema.createTable("customers", table => {
    table.increments();
    table.string("name").notNullable();
    table.string("company").notNullable();
    table.string("email").notNullable();
    table.string("phone").notNullable();
    table.string("address").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("customers");
};
