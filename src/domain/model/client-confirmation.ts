import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "@/infra/database/config/database";
import { Order } from "./order";
import { Ebook } from "./book";

export enum ClientConfirmationStatus {
  pending = "pending",
  received = "received",
  notReceived = "notReceived",
  cancelled = "cancelled",
}

export interface ClientConfirmationModel {
  id: string;
  orderId: String;
  bookId: string;
  quantity?: number;
  userId: string;

  status: ClientConfirmationStatus;

  receivedAt?: Date;
  confirmedAt?: Date;
  cancelledAt?: Date;

  note?: string;
  proofUrl?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClientConfirmationDto extends Optional<
  ClientConfirmationModel,
  "id" | "createdAt" | "updatedAt"
> {}

export interface ClientConfirmationOutput extends Required<ClientConfirmationModel> {}

export class ClientConfirmation
  extends Model<ClientConfirmationModel, ClientConfirmationDto>
  implements ClientConfirmationModel
{
  declare id: string;
  declare status: ClientConfirmationStatus;
  declare orderId: string
  declare bookId: string;
  declare quantity?: number;
  declare userId: string;
  declare confirmedAt?: Date;
  declare note?: string;
  declare proofUrl?: string;
  declare receivedAt?: Date;
  declare cancelledAt?: Date;
}

ClientConfirmation.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
     orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        ClientConfirmationStatus.pending,
        ClientConfirmationStatus.received,
        ClientConfirmationStatus.notReceived,
        ClientConfirmationStatus.cancelled,
      ),
      allowNull: false,
      defaultValue: ClientConfirmationStatus.pending,
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
  },
  {
    sequelize: sequelizeConnection,
    tableName: "ClientConfirmations",
    modelName: "ClientConfirmation",
    timestamps: true,
  },
);

ClientConfirmation.belongsTo(Order, {
     foreignKey: "orderId",
     as: "order",
 });
ClientConfirmation.belongsTo(Ebook, {
     foreignKey: "bookId",
     as: "book",
});

