"use strict";

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("Orders", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      totalAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM("pending", "shipped","delivered", "completed","cancelled"),
        allowNull: false,
        defaultValue: "pending"
      },
      shippingAddress: {
        type: DataTypes.STRING,
        allowNull: true
      },
      orderItemsId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "CartItems",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      checkedOut: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable("Orders");
  },
};