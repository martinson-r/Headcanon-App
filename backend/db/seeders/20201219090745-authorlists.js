'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert( 'AuthorLists', [
      {
        ficId: 1,
        authorId: 1,
      },
      {
        ficId: 2,
        authorId: 2,
      },
      {
        ficId: 3,
        authorId: 3,
      },
      {
        ficId: 4,
        authorId: 4,
      },
      {
        ficId: 5,
        authorId: 5,
      },
    ],
    {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('AuthorLists', null, {});
  }
};
