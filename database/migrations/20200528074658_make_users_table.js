
exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', (table) => {
        table.increments("id");
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.string("fullname");
        table.string("avatar");
        table.integer("sex").defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};
