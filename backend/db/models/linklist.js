'use strict';
module.exports = (sequelize, DataTypes) => {
  const LinkList = sequelize.define('LinkList', {
    link: DataTypes.STRING,
    ficId: DataTypes.INTEGER
  }, {});
  LinkList.associate = function(models) {
    // associations can be defined here
    LinkList.belongsTo(models.Fic, { foreignKey: "ficId"})
  };
  return LinkList;
};
