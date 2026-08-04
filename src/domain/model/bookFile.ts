import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "@/infra/database/config/database";
export interface EbookFileAttributes {
  id: string;
  ebookId: string;
  fileName: string;
  originalName: string;
  fileUrl?: string;
}

export interface EbookFileInput extends Optional<EbookFileAttributes, "id"> {}
export interface EbookFileOutput extends Required<EbookFileAttributes> {}

export class EbookFile
  extends Model<EbookFileAttributes, EbookFileInput>
  implements EbookFileAttributes
{
  declare id: string;
  declare ebookId: string;
  declare fileName: string;
  declare originalName: string;
  declare fileUrl?: string;
}

EbookFile.init(
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
    ebookId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Ebooks",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    fileUrl: {
      type: DataTypes.VIRTUAL,
      get() {
        const appUrl = (
          process.env.APP_URL ?? `http://localhost:${process.env.PORT ?? 4008}`
        ).replace(/\/$/, "");

        const fileName = this.getDataValue("fileName");

        if (!fileName) {
          return null;
        }

        return `${appUrl}/uploads/pdfs/${fileName}`;
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "EbookFiles",
    modelName: "EbookFile",
    timestamps: true,
  },
);
