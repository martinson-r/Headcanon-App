'use strict';
module.exports = (sequelize, DataTypes) => {
  const Website = sequelize.define('Website', {
    websiteName: DataTypes.STRING
  }, {});
  Website.associate = function(models) {
    // associations can be defined here
    Website.belongsToMany(models.Fic, { through: 'LinkList' });
  };
  return Website;
};
