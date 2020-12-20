'use strict';
module.exports = (sequelize, DataTypes) => {
  const FicShelf = sequelize.define('FicShelf', {
    ficListId: DataTypes.INTEGER,
    shelfName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  FicShelf.associate = function(models) {
    // associations can be defined here
    //FicShelf.hasMany(models.FicList, { foreignKey: "ficShelfId"});
    FicShelf.belongsTo(models.User, { foreignKey: 'userId'});
  };
  return FicShelf;
};
