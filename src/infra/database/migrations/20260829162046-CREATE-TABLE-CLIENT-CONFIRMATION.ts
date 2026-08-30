import { QueryInterface, DataTypes } from "sequelize";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("ClientConfirmations", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      bookId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Ebooks",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("pending", "received", "notReceived", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },

      receivedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      confirmedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      cancelledAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      proofUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.addConstraint("ClientConfirmations", {
      fields: ["orderId"],
      type: "unique",
      name: "unique_client_confirmation_order_id",
    });

    // Índices para melhorar consultas frequentes
    await queryInterface.addIndex("ClientConfirmations", ["bookId"], {
      name: "idx_client_confirmations_book_id",
    });

    await queryInterface.addIndex("ClientConfirmations", ["userId"], {
      name: "idx_client_confirmations_user_id",
    });

    await queryInterface.addIndex("ClientConfirmations", ["status"], {
      name: "idx_client_confirmations_status",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("ClientConfirmations");
  },
};
