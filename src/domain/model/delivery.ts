import { DataTypes, Model, Optional } from "sequelize";

import sequelizeConnection from "@/infra/database/config/database";

import { Order } from "./order";

export enum DeliveryStatus {
  pending = "pending",
  processing = "processing",
  shipped = "shipped",
  delivered = "delivered",
  completed = "completed",
  cancelled = "cancelled",
}

export interface DeliveryModel {
  id: string;
  clientName: string;
  phoneNumber: string;
  shippingAddress?: string | null;

  estimatedDeliveryTime?: number | null;

  shippedAt?: Date | null;
  deliveredAt?: Date | null;

  status: DeliveryStatus;

  orderId: string;
}

export interface DeliveryDto extends Optional<DeliveryModel, "id" | "status"> {}

export interface DeliveryOutput extends Required<DeliveryModel> {}

export class Delivery
  extends Model<DeliveryModel, DeliveryDto>
  implements DeliveryModel
{
  declare id: string;
  declare clientName: string;
  declare phoneNumber: string;
  declare shippingAddress?: string | null;
  declare estimatedDeliveryTime?: number | null;
  declare shippedAt?: Date | null;
  declare deliveredAt?: Date | null;
  declare status: DeliveryStatus;
  declare orderId: string;
}

Delivery.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },

    clientName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    estimatedDeliveryTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    shippedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    deliveredAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
  },
  {
    sequelize: sequelizeConnection,
    tableName: "Deliveries",
    modelName: "Delivery",
    timestamps: true,
  },
);

Delivery.hasOne(Order, {
  as: "order",
  foreignKey: "orderId",
});
