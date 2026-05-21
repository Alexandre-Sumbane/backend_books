import { DataTypes, Model, Optional } from "sequelize";

import dbConnection from "../config/database";

import { BookAttributes } from "../types/Book";

export interface BookInput extends Optional<BookAttributes, "id"> {}
export interface BookOutput extends Required<BookAttributes> {}

export class Book
  extends Model<BookAttributes, BookInput>
  implements BookAttributes
{
  declare id: string;
  declare title: string;
  declare code: string;
  declare description: string;
  declare price: number;
  declare rating: number;
  declare totalReviews: number;
  declare categoryId: string;
  declare format: string;
  declare pages?: number;
  declare publishDate?: Date;
  declare statePublisher?: boolean;
  declare locationId?: string;
  declare userId?: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  static associate(models: any) {
    Book.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });

    Book.belongsToMany(models.Author, {
      through: models.AuthorBook,
      foreignKey: "bookId",
      otherKey: "authorId",
      as: "authors"
    });
  }
}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    totalReviews: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    publishDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    statePublisher: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize: dbConnection,
    tableName: "Books",
    modelName: "Book",
    timestamps: true,
  },
);
