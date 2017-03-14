
exports.seed = function(knex, Promise) {
  var tablename = 'users';

  var rows = [
    {
      username: 'sinnott74@hotmail.com',
      password: '$2a$10$qO8jwX8MNM2B9VB0gYjsL.XL5JRSG4T9990qgcLm8xo6Ot1O6yX5u',
      firstname: 'Daniel',
      lastname: 'Sinnott',
      dob: new Date()}
  ];


  // Deletes ALL existing entries
  return knex(tablename)
    .del()
    .then(() => {
      return knex(tablename).insert(rows);
    });
};
