'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReadJoin = sequelize.define('ReadJoin', {
    readId: DataTypes.INTEGER,
    ficId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  ReadJoin.associate = function(models) {
    // associations can be defined here
  };
  return ReadJoin;
};