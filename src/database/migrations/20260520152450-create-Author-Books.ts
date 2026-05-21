"use strict";

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("AuthorBooks", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },

      authorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Authors",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      bookId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Books",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("AuthorBooks");
  },
};