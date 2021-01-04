'use strict';
module.exports = (sequelize, DataTypes) => {
  const FicList = sequelize.define('FicList', {
    readStatus: DataTypes.BOOLEAN,
    privateStatus: DataTypes.BOOLEAN,
    dateRead: DataTypes.DATE,
  }, {});
  FicList.associate = function(models) {
    // associations can be defined here
    FicList.belongsToMany(models.Fic, { through: "ListJoin", foreignKey: "ficListId", otherKey: "ficId"});
    FicList.belongsTo(models.FicShelf, { foreignKey: "ficShelfId", onDelete: 'cascade', hooks:true});
    // FicList.hasMany(models.ListJoin, { foreignKey: "ficListId"});


  };
  return FicList;
};
