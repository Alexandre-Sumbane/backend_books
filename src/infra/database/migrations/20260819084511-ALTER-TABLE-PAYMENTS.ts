"use strict";

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {


     await queryInterface.addColumn("Payments", "phoneNumber", {
      type: DataTypes.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("Payments", "transactionDate", {
      type: DataTypes.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Orders", "cartId");
  },
};
