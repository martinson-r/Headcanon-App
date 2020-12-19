'use strict';
module.exports = (sequelize, DataTypes) => {
  const FriendsList = sequelize.define('FriendsList', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
  }, {});
  FriendsList.associate = function(models) {
    // associations can be defined here
  };
  return FriendsList;
};
