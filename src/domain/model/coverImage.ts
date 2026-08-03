import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "@/infra/database/config/database";
export interface CoverImageAttributes {
  id: string;
  ebookId: string;
  imageUrl?: string;
  fileName?: string;
  originalName?: string;
}
export interface CoverImageInput extends Optional<CoverImageAttributes, "id"> {}
export interface CoverImageOutput extends Required<CoverImageAttributes> {}

export class CoverImage
  extends Model<CoverImageAttributes, CoverImageInput>
  implements CoverImageAttributes
{
  declare id: string;
  declare ebookId: string;
  declare fileName?: string;
  declare imageUrl?: string;
}

CoverImage.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.VIRTUAL,
      get() {
        const appUrl = (
          process.env.APP_URL ?? `http://localhost:${process.env.PORT ?? 4008}`
        ).replace(/\/$/, "");

        const imagePath = this.getDataValue("fileName");

        if (!imagePath) {
          return null;
        }

        return `${appUrl}/${imagePath}`;
      },
    },
    ebookId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "eBooks",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "CoverImage",
    tableName: "CoverImages",
    timestamps: true,
  },
);
