'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: DataTypes.INTEGER,
    review: DataTypes.STRING,
    ficId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.Fic, { foreignKey: "ficId"});
    Review.belongsTo(models.User, { foreignKey: "userId"});
  };
  return Review;
};
