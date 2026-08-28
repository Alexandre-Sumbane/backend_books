"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("Carts", "status", {
      type: DataTypes.ENUM(
        "pending",
        "processing",
        "paid",
        "cancelled",
        "failed",
        "blocked",
      ),
      allowNull: false,
      defaultValue: "pending",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Carts", "status");
  },
};
