"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("WithdrawalRequests", "amount", {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    });

  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("WithdrawalRequests", "amount");
  },
};
