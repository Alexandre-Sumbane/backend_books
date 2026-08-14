import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "@/infra/database/config/database";
import { CartItem } from "./cartitem";

export enum CartStatus {
  pending = "pending",
  processing = "processing",
  paid = "paid",
  cancelled = "cancelled",
}

export interface CartAttributes {
  id: string;
  userId: string;
  totalAmount: number;
  status: CartStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartDto extends Optional<CartAttributes, "id" | "status" | "createdAt" | "updatedAt"> {}

export class Cart extends Model<CartAttributes, CartDto> implements CartAttributes {
  declare id: string;
  declare userId: string;
  declare totalAmount: number;
  declare status: CartStatus;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("pending", "processing", "paid", "cancelled"),
      allowNull: false,
      defaultValue: CartStatus.pending,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Cart",
    tableName: "Carts",
    timestamps: true,
  },
);

Cart.hasMany(CartItem, { as: "cartItems", foreignKey: "cartId" });