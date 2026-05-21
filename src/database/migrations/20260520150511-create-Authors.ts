"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("Authors", {
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

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
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
    await queryInterface.dropTable("Authors");
  },
};