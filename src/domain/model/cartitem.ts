import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "@/infra/database/config/database";
import { Ebook } from "./book";


export interface CartItemModel {
    id: string;
    bookId: string;
    quantity: number;
}


export interface CartItemDto 
    extends Optional<CartItemModel, "id" | "quantity"> {}



export class CartItem
    extends Model<CartItemModel, CartItemDto>
    implements CartItemModel
{
    declare id: string;
    declare bookId: string;
    declare quantity: number;
}



CartItem.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
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
        timestamps: true,
        modelName: "CartItem",
        tableName: "CartItems",
    }
);