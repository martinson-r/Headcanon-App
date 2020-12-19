'use strict';
module.exports = (sequelize, DataTypes) => {
  const SeriesList = sequelize.define('SeriesList', {
    seriesId: DataTypes.INTEGER,
    ficId: DataTypes.INTEGER
  }, {});
  SeriesList.associate = function(models) {
    // associations can be defined here
  };
  return SeriesList;
};