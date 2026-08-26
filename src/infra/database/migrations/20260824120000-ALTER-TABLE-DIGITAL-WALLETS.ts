"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("digitalWallets", "type", {
      type: DataTypes.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("digitalWallets", "userId", {
      type: DataTypes.UUID,
      allowNull: true,
    });

    await queryInterface.addColumn("digitalWallets", "responseCode", {
      type: DataTypes.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("digitalWallets", "responseCode");
    await queryInterface.removeColumn("digitalWallets", "userId");
    await queryInterface.removeColumn("digitalWallets", "type");
  },
};
