"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    
    await queryInterface.changeColumn("Orders",  "status", {
        type: DataTypes.ENUM("pending", "processing", "shipped","delivered", "completed","cancelled"),
        allowNull: false,
        defaultValue: "pending"
      })
    
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Orders", "status");
  },
};