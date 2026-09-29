"use strict";

import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn("Ebooks", "sinopse", {
      type: DataTypes.TEXT,
      allowNull: true,
  
    });

    await queryInterface.changeColumn("Ebooks", "description", {
      type: DataTypes.TEXT,
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
