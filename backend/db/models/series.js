'use strict';
module.exports = (sequelize, DataTypes) => {
  const Series = sequelize.define('Series', {
    seriesName: DataTypes.STRING
  }, {});
  Series.associate = function(models) {
    // associations can be defined here
    Series.belongsToMany(models.Fic, { through: SeriesList});
  };
  return Series;
};
