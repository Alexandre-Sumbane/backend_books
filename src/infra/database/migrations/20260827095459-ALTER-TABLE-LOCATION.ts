"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    
    await queryInterface.addColumn("Locations", "estimatedTime", {
      type: DataTypes.INTEGER,
      allowNull: true,
    })
    
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Locations", "estimatedTime");
  },
};