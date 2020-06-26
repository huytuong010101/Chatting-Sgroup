
exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', (table) => {
        table.string("uid").unique().primary();
        table.string("email");
        table.bool("email_verified").defaultTo(false);
        table.string("phone");
        table.string("password").notNullable();
        table.string("fullname");
        table.string("avatar");
        table.timestamp('birthday');
        table.integer("sex").defaultTo(0);
        table.string("description").defaultTo("");
        table.string("address").defaultTo("");
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};
