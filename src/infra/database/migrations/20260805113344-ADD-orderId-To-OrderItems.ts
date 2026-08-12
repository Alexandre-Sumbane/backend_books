"use strict";

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {

    // await queryInterface.removeColumn("Orders", "orderItemsId");
    // await queryInterface.removeColumn("Carts", "cartItemsId");

    await queryInterface.addColumn("CartItems", "cartId", {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Carts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addColumn("OrderItems", "orderId", {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Orders",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.changeColumn("Carts", "totalAmount", {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("CartItems", "cartId");
    await queryInterface.removeColumn("OrderItems", "orderId");
    await queryInterface.removeColumn("Carts", "totalAmount");

    await queryInterface.addColumn("Orders", "orderItemsId", {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "OrderItems",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("Carts", "cartItemsId", {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "CartItems",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },
};