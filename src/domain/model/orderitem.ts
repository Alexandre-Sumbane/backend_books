import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "@/infra/database/config/database";
import { Order } from "./order";

export interface OrderItemModel {
  id: string;
  orderId: string;
  bookId: string;
  quantity: number;
}

export interface OrderItemDto extends Optional<
  OrderItemModel,
  "id" 
> {}

export class OrderItem
  extends Model<OrderItemModel, OrderItemDto>
  implements OrderItemModel
{
  declare id: string;
  declare orderId: string;
  declare bookId: string;
  declare quantity: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Ebooks",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "OrderItems",
    modelName: "OrderItem",
    timestamps: true,
  },
);
