import sequelizeConnection from '@/infra/database/config/database'
import { DataTypes, Model, type Optional } from 'sequelize';

export enum UserEbookStatus {
  pending = "pending",
  active = "active",
  blocked="blocked",
  cancelled = "cancelled",
  expired = "expired"
}

export interface UserEbookAttributes {
  id: string;
  userId: string;
  ebookId: string;
  status: UserEbookStatus;
  purchasedAt?: Date;
  lastReadPage?: number;
}

export interface UserEbookInput extends Optional<UserEbookAttributes, 'id' | 'status'> { }
export interface UserEbookOutput extends Required<UserEbookAttributes> { }

export class UserEbook extends Model<UserEbookAttributes, UserEbookInput> implements UserEbookAttributes {
  declare id: string;
  declare userId: string;
  declare ebookId: string;
  declare status: UserEbookStatus;
  public purchasedAt?: Date;
  public lastReadPage?: number;
  declare readonly createdAt?: Date
  declare readonly updatedAt?: Date
}

UserEbook.init(
  {
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
    purchasedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM('pending', 'active', 'blocked', 'expired', 'canceled'),
      allowNull: false,
      defaultValue: 'pending'
    },
    lastReadPage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'userEbook',
  },
)

