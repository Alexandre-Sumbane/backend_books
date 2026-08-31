
import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '@/infra/database/config/database';


export enum WithdrawalRequestStatus {
  pending = "pending",
  approved = "approved",
  processing = "processing",
  cancelled = "cancelled",
  rejected = "rejected",
  blocked = "blocked",
}

export interface WithdrawalRequestAtributes {
  id: string
  sellerId: string
  reference?: string
  amount: number
  walletId: string
  reason?: string
  status: WithdrawalRequestStatus

  approvedAt?: Date
  rejectedAt?: Date
  canceledAt?: Date
}
export interface WithdrawalRequestInput
  extends Optional<WithdrawalRequestAtributes, 'id' | 'status' | 'approvedAt' | 'rejectedAt' | 'canceledAt'> {}
export interface WithdrawalRequestOutput
  extends Required<WithdrawalRequestAtributes> {}

export class WithdrawalRequest extends 
    Model<WithdrawalRequestAtributes, WithdrawalRequestInput> 
    implements WithdrawalRequestAtributes 
{
  declare id: string;
  declare sellerId: string;
  declare reference?: string;
  declare amount: number;
  declare walletId: string;
  declare reason?: string;
  declare status: WithdrawalRequestStatus;

  declare approvedAt?: Date;
  declare rejectedAt?: Date;
  declare canceledAt?: Date;

  declare createdAt?: Date;
  declare updatedAt?: Date;
}

WithdrawalRequest.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  sellerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  walletId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'approved', 'rejected', 'canceled', 'blocked'),
    allowNull: false,
    defaultValue: 'pending'
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true
  },
  approvedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  rejectedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  canceledAt: {
    type: DataTypes.DATE,
    allowNull: true 
  }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "WithdrawalRequest",
    tableName: 'WithdrawalRequests',
});

