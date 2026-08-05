"use strict";

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Carts", "checkedOut");

    await queryInterface.addColumn("Carts", "status", {
      type: DataTypes.ENUM("pending", "processing", "paid", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    });

    await queryInterface.addColumn("Carts", "totalAmount", {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Carts", "status");

    await queryInterface.addColumn("Carts", "checkedOut", {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },
};
