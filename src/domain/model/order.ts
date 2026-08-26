import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "@/infra/database/config/database";
import { OrderItem } from "./orderitem";

export enum OrderStatus {
  pending = "pending",
  processing = "processing",
  shipped = "shipped",
  delivered = "delivered",
  completed = "completed",
  cancelled = "cancelled",
}

export interface OrderModel {
  id: string;
  orderNumber: string;
  totalAmount?: number | null;
  status: OrderStatus;
  shippingAddress?: string | null;
  userId: string;
  cartId?: string | null; 
}

export interface OrderDto extends Optional<
  OrderModel,
  "id" | "status" 
> {}

export class Order extends Model<OrderModel, OrderDto> implements OrderModel {
  declare id: string;
  declare orderNumber: string;
  declare totalAmount?: number | null;
  declare status: OrderStatus;
  declare shippingAddress?: string | null;
  declare userId: string;
  declare cartId?: string | null 
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },

    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    totalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "processing",
        "shipped",
        "delivered",
        "completed",
        "cancelled",
      ),
      defaultValue: "pending",
      allowNull: false,
    },

    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    cartId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "Orders",
    modelName: "Order",
    timestamps: true,
  },
);

Order.hasMany(OrderItem, {
  as: "orderItems",
  foreignKey: "orderId",
})
