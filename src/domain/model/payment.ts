import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '@/infra/database/config/database';

export enum PaymentMethod {
  mpesa = "mpesa",
  emola = "emola",
  bank = "bank",
  mkesh = "mkesh",
}

export enum PaymentStatus {
  pending = "pending",
  processing = "processing",
  completed = "completed",
  cancelled = "cancelled",
  failed = "failed",
  blocked = "blocked",
}

export interface PaymentAttributes {
  id: string;
  paymentMethod: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  transactionDate: Date;
  reference?: string;
  reason?: string;
  shippingAddress?: string;
  orderId: string;
  userId: string;
  phoneNumber?: string
}
export interface PaymentInput
  extends Optional<PaymentAttributes, 'id' | 'status'> {}
export interface PaymentOutput
  extends Required<PaymentAttributes> {}

export class Payment extends 
    Model<PaymentAttributes, PaymentInput> 
    implements PaymentAttributes 
{
  declare id: string;
  declare userId: string;
  declare orderId: string;
  declare amount: number;
  declare paymentMethod: PaymentMethod;
  declare reference?: string;
  declare transactionDate: Date;
  declare status: PaymentStatus;
  declare phoneNumber?: string
  declare reason?: string;
  declare shippingAddress?: string;

  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Payment.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ENUM('mpesa', 'emola', 'mkesh', 'bank'),
    allowNull: false
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: true
  },
  transactionDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled', 'failed', 'blocked'),
    allowNull: false,
    defaultValue: 'pending'
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true
  },
  shippingAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "Payment",
    tableName: 'Payments',
});
