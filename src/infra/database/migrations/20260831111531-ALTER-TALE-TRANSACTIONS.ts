"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("Transactions", "type", {
      type: DataTypes.ENUM("sale", "refund", "withdrawal"),
      allowNull: false,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Transactions", "type");
  },
};
