
exports.up = function (knex) {
    return knex.schema.createTable("customers_tee_times", function (table) {
        table.increments();
        table
            .integer("customer_id")
            .references("customers.id")
            .onDelete("CASCADE"); //referencing id column of the users table
        table
            .integer("tee_time_id")
            .references("tee_times.id")
            .onDelete("CASCADE"); //referencing id column of the appointments table
    });
};