import sequelizeConnection from '@/infra/database/config/database'
import { DataTypes, Model, type Optional } from 'sequelize'
import { PaymentMethod } from './payment'

export interface DigitalWalletAttributes {
  id: string
  type?: PaymentMethod
  amount: number
  transactionReference?: string
  thirdPartyReference?: string
  userId: string
  responseDescription?: string
  responseCode?: string
  phoneNumber: string;
  paymentId: string;
}

export interface DigitalWalletInput extends Optional<DigitalWalletAttributes, 'id'> { }
export interface DigitalWalletOutput extends Required<DigitalWalletAttributes> { }

export class DigitalWallet extends Model<DigitalWalletAttributes, DigitalWalletInput> implements DigitalWalletAttributes {
  declare id: string
  declare type?: PaymentMethod
  declare amount: number
  declare transactionReference?: string
  declare thirdPartyReference?: string
  declare userId: string
  declare responseDescription?: string
  declare responseCode?: string
  declare phoneNumber: string;
  declare paymentId: string;
}

DigitalWallet.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    transactionReference: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    thirdPartyReference: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    paymentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Payments',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    responseDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responseCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'digitalWallets',
  },
)