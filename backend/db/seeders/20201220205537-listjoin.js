'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ListJoins', [{
        ficListId: 1,
        ficShelfId: 1,
        ficId: 1,
        userId: 1,
        privateStatus: false,
        readStatus: false,
        dateRead: '2020-01-01'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('ListJoins', null, {});
  }
};
