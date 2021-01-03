'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert( 'Reviews', [
      {
        rating: 5,
        review: 'Great fic!',
        userId: 2,
        ficId: 1,
      },
      {
        rating: 5,
        review: 'Love it!',
        userId: 1,
        ficId: 2,
      },
      {
        rating: 5,
        review: 'Sweet!',
        userId: 3,
        ficId: 3,
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
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
