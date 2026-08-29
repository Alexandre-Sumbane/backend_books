"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("userEbook", "deliveryId", {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Deliveries",
        key: 'id'
      }
    })
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("userEbook", "deliveryId");
  },
};
