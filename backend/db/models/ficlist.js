'use strict';
module.exports = (sequelize, DataTypes) => {
  const FicList = sequelize.define('FicList', {
    privateStatus: DataTypes.BOOLEAN,
    readStatus: DataTypes.BOOLEAN,
    dateRead: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    listName: DataTypes.STRING,
  }, {});
  FicList.associate = function(models) {
    // associations can be defined here
    //FicList.belongsTo(models.FicShelf, { foreignKey: "ficShelfId"});
    FicList.belongsToMany(models.Fic, { through: "ListJoin", foreignKey: "ficListId", otherKey: "ficId"});

  };
  return FicList;
};
