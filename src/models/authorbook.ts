import { DataTypes, Model, Optional } from "sequelize";

import dbConnection from "../config/database";

import {  AuthorBookAttributes } from "../types/Author";

export interface AuthorBookInput extends Optional<AuthorBookAttributes, "id"> {}
export interface AuthorBookOutput extends Required<AuthorBookAttributes> {}

export class AuthorBook
  extends Model<AuthorBookAttributes, AuthorBookInput>
  implements AuthorBookAttributes
{
  declare id: string;
  declare authorId: string;
  declare bookId: string;

  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  static associate(models: any) {
    AuthorBook.belongsTo(models.Author, {
      foreignKey: "authorId",
      as: "author",
    });
    AuthorBook.belongsTo(models.Book, {
      foreignKey: "bookId",
      as: "book",
    });
  }
}

AuthorBook.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize: dbConnection,
    tableName: "AuthorBooks",
    modelName: "AuthorBook",
    timestamps: true,
  },
);
