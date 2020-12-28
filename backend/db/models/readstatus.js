'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReadStatus = sequelize.define('ReadStatus', {
    readStatus: DataTypes.BOOLEAN,
    privateStatus: DataTypes.BOOLEAN,
    dateRead: DataTypes.DATE,
    dateAdded: DataTypes.DATE
  }, {});
  ReadStatus.associate = function(models) {
    // associations can be defined here
    ReadStatus.belongsToMany(models.Fic, { through: "ReadJoin", foreignKey: "readId", otherKey: "ficId", onDelete: 'cascade', hooks:true});
  };
  return ReadStatus;
};
