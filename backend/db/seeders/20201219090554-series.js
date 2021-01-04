'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert('Series', [
      {
        seriesName: 'Naruto',
      },
      {
        seriesName: 'Star Wars',
      },
      {
        seriesName: 'The Avengers',
      },
      {
        seriesName: 'Pokemon',
      },
      {
        seriesName: 'My Little Pony',
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
   return queryInterface.bulkDelete('Series', null, {});
  }
};
