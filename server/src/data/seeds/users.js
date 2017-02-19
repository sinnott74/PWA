
exports.seed = function(knex, Promise) {
  var tablename = 'users';

  var rows = [
    {
      username: 'sinnott74@hotmail.com',
      password: 'password',
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
