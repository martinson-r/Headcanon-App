'use strict';
module.exports = (sequelize, DataTypes) => {
  const FicShelf = sequelize.define('FicShelf', {
    shelfName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    ficListId: DataTypes.INTEGER
  }, {});
  FicShelf.associate = function(models) {
    // associations can be defined here
    FicShelf.hasOne(models.FicList, { foreignKey: "ficListId"});
  };
  return FicShelf;
};
