'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fic = sequelize.define('Fic', {
    title: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    datePublished: DataTypes.DATE
  }, {});
  Fic.associate = function(models) {
    Fic.belongsToMany(models.Author, {through: 'AuthorList', foreignKey: 'ficId', otherKey: 'authorId'});
    Fic.hasMany(models.ListJoin, { foreignKey: { name: "ficId", allowNull: true},});
    Fic.belongsToMany(models.FicList, { through: "ListJoin", foreignKey: "ficId", otherKey: "ficListId"});
    Fic.hasMany(models.Review, {foreignKey: "ficId",});
    Fic.hasMany(models.LinkList, {foreignKey: "ficId",});
    // associations can be defined here
  };
  return Fic;
};
