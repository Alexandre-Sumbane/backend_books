"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("Ebooks", "statePublisher", {
      type: DataTypes.ENUM("pendent", "published", "rejected", "blocked"),
      allowNull: true,
      defaultValue: "pendent",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("Ebooks", "statePublisher", {
      type: DataTypes.ENUM("pendent", "published", "blocked"),
      allowNull: true,
      defaultValue: "pendent",
    });
  },
};
