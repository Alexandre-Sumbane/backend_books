"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.renameColumn("Ebooks", "userId", "sellerId");

    await queryInterface.addColumn("Ebooks", "type", {
      type: DataTypes.ENUM("new", "used"),
      allowNull: false,
      defaultValue: "new",
    });

    await queryInterface.changeColumn("Ebooks", "format", {
      type: DataTypes.ENUM("pdf", "physical"),
      allowNull: false,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("Ebooks", "format", {
      type: DataTypes.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn("Ebooks", "type");
    await queryInterface.renameColumn("Ebooks", "sellerId", "userId");
  },
};