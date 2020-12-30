'use strict';

module.exports = (sequelize, DataTypes) => {
  const ListJoin = sequelize.define('ListJoin', {
    ficListId: DataTypes.INTEGER,
    ficId: DataTypes.INTEGER,
    ficShelfId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    readStatus: DataTypes.BOOLEAN,
    privateStatus: DataTypes.BOOLEAN,
    dateRead: DataTypes.DATE,
  }, {});
  ListJoin.associate = function(models) {
    ListJoin.belongsTo(models.FicShelf, { foreignKey: "ficShelfId" });
    // associations can be defined here
  };
  return ListJoin;
};
