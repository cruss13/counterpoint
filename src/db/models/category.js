'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    title: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};