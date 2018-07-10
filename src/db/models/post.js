'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topicId: {
       type: DataTypes.INTEGER,
       allowNull: false
    },
    sectionId: {
       type: DataTypes.INTEGER,
       allowNull: false
    },
    categoryId: {
       type: DataTypes.INTEGER,
       allowNull: false
    },
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
    Post.belongsTo(models.Section, {
      foreignKey: "sectionId",
      onDelete: "CASCADE"
    });
    Post.belongsTo(models.Category, {
      foreignKey: "categoryId",
      onDelete: "CASCADE"
    });
  };
  return Post;
};
