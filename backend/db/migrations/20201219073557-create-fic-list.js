'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FicLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ficId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Fics", key: "id" },
      },
      privateStatus: {
        type: Sequelize.BOOLEAN
      },
      readStatus: {
        type: Sequelize.BOOLEAN
      },
      dateRead: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FicLists');
  }
};
