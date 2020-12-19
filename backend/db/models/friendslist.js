'use strict';

module.exports = (sequelize, DataTypes) => {
  const FriendsList = sequelize.define('FriendsList', {
    userId: DataTypes.INTEGER,
  }, {});
  FriendsList.associate = function(models) {
    // associations can be defined here
  };
  return FriendsList;
};
