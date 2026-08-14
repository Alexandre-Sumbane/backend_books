"use strict";

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("Orders", "cartId", {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Carts",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Orders", "cartId");
  },
};
