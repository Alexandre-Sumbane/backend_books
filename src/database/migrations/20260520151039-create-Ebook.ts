"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, ) {
    await queryInterface.createTable("Books", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      totalReviews: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
     format: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      publishDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      statePublisher: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("Books");
  },
};