import { DataTypes, Model, Optional } from "sequelize";

import dbConnection from "../config/database";

import { CategoryAttributes } from "../types/category";

export interface CategoryInput extends Optional<CategoryAttributes, "id"> {}
export interface CategoryOutput extends Required<CategoryAttributes> {}

export class Category
  extends Model<CategoryAttributes, CategoryInput>
  implements CategoryAttributes
{
  declare id: string;
  declare name: string;
  declare description: string;
  declare imageUrl?: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  static associate(models: any) {
    Category.hasMany(models.Book, {
      foreignKey: "categoryId",
      as: "books",
    });
  }
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
