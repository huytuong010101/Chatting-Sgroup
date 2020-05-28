
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, email: 'admin@gmail.com', password: 'admin' },
        { id: 2, email: 'admin2@gmail.com', password: 'admin2' },
      ]);
    });
};
