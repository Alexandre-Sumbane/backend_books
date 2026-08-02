"use strict";

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("Transferences", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      status: {
        type: DataTypes.ENUM("pending", "processing","confirmed", "blocked"),
        allowNull: false,
        defaultValue: "pending"
      },
      transactionId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      reference: {
        type: DataTypes.STRING,
        allowNull: true
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: true
      },
      paymentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Payments",
          key: "id",
        },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("Transferences");
  },
};