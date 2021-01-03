'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert('LinkLists', [
      {
        link: 'https://www.fanfiction.net/s/9204235/1/Naruto-Infinite',
        ficId: 1,
      },
      {
        link: 'https://www.fanfiction.net/s/13775634/1/Star-Wars-The-Lost-Blueberry',
        ficId: 2,
      },
      {
        link: 'https://www.fanfiction.net/s/13783483/1/Pesto-Or-PestNO',
        ficId: 3,
      },
      {
        link: 'https://www.fanfiction.net/s/5804262/1/Pokemon-Diamond-How-to-Catch-a-Legendary',
        ficId: 4,
      },
      {
        link: 'https://www.fanfiction.net/s/7747960/1/My-Little-Pony-Kingdom-Hearts-is-Magic',
        ficId: 5,
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
   return queryInterface.bulkDelete('LinkLists', null, {});
  }
};
