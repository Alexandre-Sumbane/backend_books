"use strict";

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {

    await queryInterface.addColumn("Ebooks", "quantity", {
      type: DataTypes.INTEGER,
      allowNull: true
    });

  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Ebooks", "quantity");

  } 
};
