'use strict';
module.exports = (sequelize, DataTypes) => {
  const FicList = sequelize.define('FicList', {
    ficId: DataTypes.INTEGER,
    privateStatus: DataTypes.BOOLEAN,
    readStatus: DataTypes.BOOLEAN,
    dateRead: DataTypes.DATE
  }, {});
  FicList.associate = function(models) {
    // associations can be defined here
    FicList.hasOne(models.FicShelf, { foreignKey: "ficListId"});

  };
  return FicList;
};
