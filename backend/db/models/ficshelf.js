'use strict';
module.exports = (sequelize, DataTypes) => {
  const FicShelf = sequelize.define('FicShelf', {
    shelfName: DataTypes.STRING,
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
    ficListId: DataTypes.INTEGER
  }, {});
  FicShelf.associate = function(models) {
    // associations can be defined here
    FicShelf.hasOne(models.FicList, { foreignKey: "ficListId"});
  };
  return FicShelf;
};
