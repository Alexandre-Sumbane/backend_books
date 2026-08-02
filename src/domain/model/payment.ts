import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '@/infra/database/config/database';

enum PaymentMethod {
  mpesa,
  emola,
  mkesh,
  bank
}

export interface PaymentAttributes {
  id: string;
  userId: string;
  ebookId: string;
  pricePaid: number;
  paymentMethod: PaymentMethod;
  transactionDate: Date;
  status: number;
  phoneNumber: number
}
export interface PaymentInput
  extends Optional<PaymentAttributes, 'id'> {}
export interface PaymentOutput
  extends Required<PaymentAttributes> {}

export class Payment extends 
    Model<PaymentAttributes, PaymentInput> 
    implements PaymentAttributes 
{
  declare id: string;
  declare userId: string;
  declare ebookId: string;
  declare pricePaid: number;
  declare paymentMethod: PaymentMethod;
  declare transactionDate: Date;
  declare status: number;
  declare phoneNumber:number

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
  ebookId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
        model: 'eBooks',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  pricePaid: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ENUM('mpesa', 'emola', 'mkesh', 'bank'),
    allowNull: false
  },
  transactionDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 200,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    modelName: "Payment",
    tableName: 'Payments',
});