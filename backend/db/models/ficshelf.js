'use strict';
module.exports = (sequelize, DataTypes) => {
  const FicShelf = sequelize.define('FicShelf', {
    shelfName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  FicShelf.associate = function(models) {
    // associations can be defined here
    //FicShelf.hasMany(models.FicList, { foreignKey: "ficShelfId"});
    // FicShelf.belongsTo(models.User, { foreignKey: 'userId'});
    FicShelf.hasMany(models.ListJoin, { foreignKey: 'ficShelfId', onDelete: 'cascade', hooks:true });
    FicShelf.hasMany(models.FicList, { foreignKey: "ficShelfId", onDelete: 'cascade', hooks:true });
  };
  return FicShelf;
};
