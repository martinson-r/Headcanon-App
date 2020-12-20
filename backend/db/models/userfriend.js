'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFriend = sequelize.define('UserFriend', {
    userId: DataTypes.INTEGER
  }, {});
  UserFriend.associate = function(models) {
    // associations can be defined here
    UserFriend.belongsToMany(models.User, { through: 'FriendsList', foreignKey: 'userFriendsId', otherKey: 'userId'} );
  };
  return UserFriend;
};
