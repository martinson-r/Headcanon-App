'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fic = sequelize.define('Fic', {
    title: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    datePublished: DataTypes.DATE
  }, {});
  Fic.associate = function(models) {
    Fic.belongsToMany(models.Website, {through: LinkList});
    Fic.belongsToMany(models.Author, {through: AuthorList});
    Fic.belongsToMany(models.User, {through: FicShelf});
    Fic.belongsToMany(models.Series, {through: FicList});
    Fic.hasMany(models.Review, {foreignKey: "ficId"});
    // associations can be defined here
  };
  return Fic;
};
