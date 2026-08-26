"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("Transactions", "status", {
      type: DataTypes.ENUM("pending", "processing", "confirmed", "failed"),
      allowNull: false,
      defaultValue: "pending",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Transactions", "status");
  },
};
