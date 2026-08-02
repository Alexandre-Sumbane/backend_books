"use strict";

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("Payments", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      paymentMethod: {
        type: DataTypes.ENUM("mpesa", "emola", "transference", "bank"),
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM("pending", "processing","completed","cancelled", "failed", "blocked"),
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
      shippingAddress: {
        type: DataTypes.STRING,
        allowNull: true
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
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
    await queryInterface.dropTable("Payments");
  },
};