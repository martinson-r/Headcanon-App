'use strict';
module.exports = (sequelize, DataTypes) => {
  const LinkList = sequelize.define('LinkList', {
    link: DataTypes.STRING,
    websiteId: DataTypes.INTEGER,
    ficId: DataTypes.INTEGER
  }, {});
  LinkList.associate = function(models) {
    // associations can be defined here
  };
  return LinkList;
};
