'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Topics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      sectionId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE", // delete post if parent section is deleted
        allowNull: false,    // validation to prevent null value
        references: {        // association information
          model: "Sections",   // table name
          key: "id",         // attribute to use
          as: "sectionId"      // reference as sectionId
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Topics');
  }
};
