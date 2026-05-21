import { DataTypes, Model, Optional } from "sequelize";

import dbConnection from "../config/database";

import { AuthorAttributes } from "../types/Author";

export interface AuthorInput extends Optional<AuthorAttributes, "id"> {}
export interface BookOutput extends Required<AuthorAttributes> {}

export class Author
  extends Model<AuthorAttributes, AuthorInput>
  implements AuthorAttributes
{
  declare id: string;
  declare name: string;
  declare lastName: string;
  declare imageUrl?: string;

  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  static associate(models: any) {
    Author.belongsToMany(models.Book, {
      through: models.AuthorBook,
      foreignKey: "authorId",
      otherKey: "bookId",
      as: "books",
    });
  }
}

Author.init(
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
    lastName: {
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
    tableName: "Authors",
    modelName: "Author",
    timestamps: true,
  },
);
