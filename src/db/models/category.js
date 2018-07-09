'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Section, {
      foreignKey: "categoryId",
      as: "sections"
    });
    Category.hasMany(models.Topic, {
      foreignKey: "categoryId",
      as: "topics"
    });
  };
  return Category;
};
