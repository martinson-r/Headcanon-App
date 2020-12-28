'use strict';
module.exports = (sequelize, DataTypes) => {
  const FicList = sequelize.define('FicList', {
    userId: DataTypes.INTEGER,
    listName: DataTypes.STRING,
  }, {});
  FicList.associate = function(models) {
    // associations can be defined here
    //FicList.belongsTo(models.FicShelf, { foreignKey: "ficShelfId"});
    FicList.belongsToMany(models.Fic, { through: "ListJoin", foreignKey: "ficListId", otherKey: "ficId", onDelete: 'cascade', hooks:true});

  };
  return FicList;
};
