import sequelizeConnection from '@/infra/database/config/database'
import { DataTypes, Model, type Optional } from 'sequelize'

export interface DigitalWalletAttributes {
  id: string
  amount: number
  transactionReference: string
  thirdPartyReference: string
  userId: string
  responseDescription: string
  phoneNumber: number
  paymentId: string;
}

export interface DigitalWalletInput extends Optional<DigitalWalletAttributes, 'id'> { }
export interface DigitalWalletOutput extends Required<DigitalWalletAttributes> { }

export class DigitalWallet extends Model<DigitalWalletAttributes, DigitalWalletInput> implements DigitalWalletAttributes {
  declare id: string
  declare amount: number
  declare transactionReference: string
  declare thirdPartyReference: string
  declare userId: string
  declare responseDescription: string
  declare phoneNumber: number;
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
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    transactionReference: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    thirdPartyReference: {
      type: DataTypes.STRING,
      allowNull: false,
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
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    tableName: 'digitalWallets',
  },
)