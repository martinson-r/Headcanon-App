'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ListJoins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
      },
      ficId: {
        type: Sequelize.INTEGER,
        references: { model: "Fics", key: "id" },
      },
      ficShelfId: {
        type: Sequelize.INTEGER,
        references: { model: "FicShelves", key: "id" },
      },
      ficListId: {
        type: Sequelize.INTEGER,
        references: { model: "FicLists", key: "id" },
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
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ListJoins');
  }
};
