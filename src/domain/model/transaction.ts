import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "@/infra/database/config/database";

export enum TransactionType {
  sell = "sell",
  refund = "refund",
  withdrawal = "withdrawal",
}

export interface TransactionAttributes {
  id: string;
  bookId?: string;
  amount: number;
  userId?: string;
  sellerId?: string;
  type: TransactionType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TransactionInput
  extends Optional<
    TransactionAttributes,
    "id" | "bookId" | "userId" | "sellerId"
  > {}

export class Transaction
  extends Model<TransactionAttributes, TransactionInput>
  implements TransactionAttributes
{
  declare id: string;
  declare bookId?: string;
  declare amount: number;
  declare userId?: string;
  declare sellerId?: string;
  declare type: TransactionType;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    sellerId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("sell", "refund", "withdrawal"),
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Transaction",
    tableName: "Transactions",
    timestamps: true,
  },
);
