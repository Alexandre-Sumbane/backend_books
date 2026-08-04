import { DataTypes, Model, Optional } from "sequelize";

import dbConnection from "../../infra/database/config/database";

import { CategoryDto } from "../Dto/category";
import { Ebook } from "./book";

export interface CategoryAttributes {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category
  extends Model<CategoryAttributes, CategoryDto>
  implements CategoryAttributes
{
  declare id: string;
  declare name: string;
  declare description: string;
  declare imageUrl?: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: dbConnection,
    modelName: "Category",
    tableName: "Categories",
    timestamps: true,
  },
);
