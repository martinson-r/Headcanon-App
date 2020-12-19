'use strict';
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    authorName: DataTypes.STRING
  }, {});
  Author.associate = function(models) {
    // associations can be defined here
    Author.belongsToMany(models.Fic, {through: 'AuthorList', foreignKey: 'authorId', otherKey: 'ficId' });
  };
  return Author;
};
