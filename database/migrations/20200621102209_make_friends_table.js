
exports.up = (knex, Promise) => {
    return knex.schema.createTable('friends', (table) => {
        table.increments("id")
        table.string('userA');
        table.foreign('userA').references('users.uid');
        table.string('userB');
        table.foreign('userB').references('users.uid');
        table.integer('relationship').notNullable();
        /* 
        0: A send B
        1: A recieve from B
        2: accept
        3: A block B
        4: B block A
        5: unfriend
        */
        table.string('message');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.dateTime('updated_at');

    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('friends');
};
