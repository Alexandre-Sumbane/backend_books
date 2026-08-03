import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("Ebooks", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      sinopse: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },

      totalReviews: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },

      categoryId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      format: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      pages: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      publishDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      statePublisher: {
        type: DataTypes.ENUM(
          "pendent",
          "published",
          "blocked"
        ),
        defaultValue: "pendent",
        allowNull: true,
      },

      userId: {
        type: DataTypes.UUID,
        allowNull: true
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("Ebooks");
  },
};