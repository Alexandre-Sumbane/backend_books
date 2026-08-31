import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '@/infra/database/config/database';

export enum TransactionType {
  sale = "sale",
  withdrawal = "withdrawal",
  refund = "refund",
}

export enum TransactionStatus {
  pending = "pending",
  processing = "processing",
  confirmed = "confirmed",
  failed = "failed",
}

export interface TransactionAttriutes {
  id: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  bookId?: string;
  quantity?: number;
  userId?: string;
  sellerId?: string;
}
export interface TransactionInput
  extends Optional<TransactionAttriutes, 'id'> {}
export interface TransactionOutput
  extends Required<TransactionAttriutes> {}

export class Transaction extends 
    Model<TransactionAttriutes, TransactionInput> 
    implements TransactionAttriutes 
{
  declare id: string;
  declare type: TransactionType;
  declare amount: number;
  declare status: TransactionStatus;
  declare bookId: string;
  declare quantity?: number;
  declare userId?: string;
  declare sellerId?: string;

  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Transaction.init({
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
    type: DataTypes.ENUM("sale", "refund", "withdrawal"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "processing", "confirmed", "failed"),
    allowNull: false,
    defaultValue: TransactionStatus.pending,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "Transaction",
    tableName: 'Transactions',
});
