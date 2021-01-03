'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert( 'Fics', [
      {
        title: 'Naruto Infinite',
        synopsis: 'Not an x-over. Naruto gains the ability to punch through dimensions and is surprised by what he finds: himself. Naruto teams up with Naruto, and Naruto, and Naruto, and Naruto, and Naruto. No pairings as of yet.',
        datePublished: '2013-04-04',
      },
      {
        title: 'Star Wars The Lost Blueberry',
        synopsis: 'Sabine Wren and Ahsoka Tano left to find and bring him home but after a year of exploring the Unknown Regions, they found something but what they find is more than what they imagined. Sorry if it\'s bad it\'s my first time and thanks for reading',
        datePublished: '2020-12-22',
      },
      {
        title: 'Pesto Or PestNO',
        synopsis: 'Tony, Steve and The Great Avengers Sauce Debate. The Avengers are all children. (Not literally, just mentally.) [AU, complete.]',
        datePublished: '2020-12-31',
      },
      {
        title: 'Pokemon Diamond: How to Catch a Legendary',
        synopsis: 'Basically a story about catching Legendary Pokemon, a few Pokemon Event Pokemon, and possibly Swarming Pokemon.',
        datePublished: '2010-03-09',
      },
      {
        title: 'My Little Pony Kingdom Hearts is Magic',
        synopsis: 'Kingdom Hearts characters hae an adventure with the My Little Ponies.',
        datePublished: '2012-01-16',
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
   return queryInterface.bulkDelete('Fics', null, {});
  }
};
