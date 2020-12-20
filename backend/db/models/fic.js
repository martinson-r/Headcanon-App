'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fic = sequelize.define('Fic', {
    title: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    datePublished: DataTypes.DATE
  }, {});
  Fic.associate = function(models) {
    Fic.belongsToMany(models.Website, {through: 'LinkList', foreignKey: 'ficId', otherKey: 'websiteId'});
    Fic.belongsToMany(models.Author, {through: 'AuthorList', foreignKey: 'ficId', otherKey: 'authorId'});
    Fic.belongsToMany(models.FicList, { through: "ListJoin", foreignKey: "ficId", otherKey: "ficListId"});
    Fic.hasMany(models.Review, {foreignKey: "ficId",});
    // associations can be defined here
  };
  return Fic;
};
