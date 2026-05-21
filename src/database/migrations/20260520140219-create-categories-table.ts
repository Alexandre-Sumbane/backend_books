"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("Categories", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      imageUrl: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable("Categories");
  },
};