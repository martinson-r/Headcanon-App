'use strict';
module.exports = (sequelize, DataTypes) => {
  const AuthorList = sequelize.define('AuthorList', {
    ficId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {});
  AuthorList.associate = function(models) {
    // associations can be defined here
  };
  return AuthorList;
};
