"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("Transactions", "quantity", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("userEbook", "quantity", {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Transactions", "quantity");
  },
};
