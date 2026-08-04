import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "@/infra/database/config/database";
import { Author } from "./author";

export interface AuthorBookModel {
  id: string;
  authorId: string;
  bookId: string;
}

export interface AuthorBookDto extends Optional<AuthorBookModel, "id"> {}

export class AuthorBook
  extends Model<AuthorBookModel, AuthorBookDto>
  implements AuthorBookModel
{
  declare id: string;
  declare authorId: string;
  declare bookId: string;
}

AuthorBook.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Authors",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Ebooks",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: sequelizeConnection,
    timestamps: true,
    modelName: "AuthorBook",
    tableName: "AuthorBooks",
  },
);
