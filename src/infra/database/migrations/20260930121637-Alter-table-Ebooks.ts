"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("Ebooks", "type", {
      type: DataTypes.ENUM("used", "new", "ebook"),
      allowNull: true,
  
    });
  },

  async down(queryInterface: QueryInterface) {
    // await queryInterface.changeColumn("Ebooks", "statePublisher", {
    //   type: DataTypes.ENUM("pendent", "published", "blocked"),
    //   allowNull: true,
    //   defaultValue: "pendent",
    // });
  },
};
