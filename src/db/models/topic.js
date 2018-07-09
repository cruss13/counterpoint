'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topic = sequelize.define('Topic', {
    title: {
       type: DataTypes.STRING,
       allowNull: false
     },
     sectionId: {
       type: DataTypes.INTEGER,
       allowNull: false
     },
     categoryId: {
       type: DataTypes.INTEGER,
       allowNull: false
     }
  }, {});
  Topic.associate = function(models) {
    // associations can be defined here
    Topic.belongsTo(models.Section, {
      foreignKey: "sectionId",
      onDelete: "CASCADE"
    });
    Topic.belongsTo(models.Category, {
      foreignKey: "categoryId",
      onDelete: "CASCADE"
    });
  };
  return Topic;
};
