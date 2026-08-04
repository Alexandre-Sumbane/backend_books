import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "@/infra/database/config/database";


export interface AuthorModel {
    id: string;
    name: string;
    lastName: string;
    imageUrl?: string;
}


export interface AuthorDto 
    extends Optional<AuthorModel, "id"> {}


export class Author 
    extends Model<AuthorModel, AuthorDto>
    implements AuthorModel
{
    declare id: string;
    declare name: string;
    declare lastName: string;
    declare imageUrl?: string;
}


Author.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
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
        sequelize: sequelizeConnection,
        timestamps: true,
        modelName: "Author",
        tableName: "Authors",
    }
);