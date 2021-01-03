'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert('Authors', [
      {
        authorName: 'JackOfBladesX',
      },
      {
        authorName: 'Unacceptablenoob27',
      },
      {
        authorName: 'Lacrimula Falsa',
      },
      {
        authorName: 'Spotty1006',
      },
      {
        authorName: 'lightyearpig',
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
   return queryInterface.bulkDelete('Authors', null, {});
  }
};
