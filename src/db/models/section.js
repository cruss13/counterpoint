'use strict';
module.exports = (sequelize, DataTypes) => {
  var Section = sequelize.define('Section', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Section.associate = function(models) {
    // associations can be defined here
    Section.belongsTo(models.Category, {
      foreignKey: "categoryId",
      onDelete: "CASCADE"
    })
    Section.hasMany(models.Topic, {
      foreignKey: "sectionId",
      as: "topics"
    });
  };
  return Section;
};
