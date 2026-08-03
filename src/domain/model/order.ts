import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "@/infra/database/config/database";
import { OrderItem } from "./orderitem";


export enum OrderStatus {
    pending = "pending",
    shipped = "shipped",
    delivered = "delivered",
    completed = "completed",
    cancelled = "cancelled",
}


export interface OrderModel {
    id: string;
    orderNumber: string;
    totalAmount: number;
    status: OrderStatus;
    shippingAddress?: string;
    userId: string;
    checkedOut: boolean;
}


export interface OrderDto 
extends Optional<OrderModel, "id" | "status" | "checkedOut"> {}



export class Order
extends Model<OrderModel, OrderDto>
implements OrderModel
{
    declare id: string;
    declare orderNumber: string;
    declare totalAmount: number;
    declare status: OrderStatus;
    declare shippingAddress?: string;
    declare userId: string;
    declare checkedOut: boolean;
}



Order.init(
{
    id:{
        type: DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false
    },

    orderNumber:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },

    totalAmount:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },

    status:{
        type:DataTypes.ENUM(
            "pending",
            "shipped",
            "delivered",
            "completed",
            "cancelled"
        ),
        defaultValue:"pending",
        allowNull:false
    },

    shippingAddress:{
        type:DataTypes.STRING,
        allowNull:true
    },

    userId:{
        type:DataTypes.UUID,
        allowNull:false
    },

    checkedOut:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false
    }

},
{
    sequelize:sequelizeConnection,
    tableName:"Orders",
    modelName:"Order",
    timestamps:true
}
);