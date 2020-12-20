'use strict';
module.exports = (sequelize, DataTypes) => {
  const ListJoin = sequelize.define('ListJoin', {
    ficId: DataTypes.INTEGER,
    ficListId: DataTypes.INTEGER
  }, {});
  ListJoin.associate = function(models) {
    // associations can be defined here
  };
  return ListJoin;
};