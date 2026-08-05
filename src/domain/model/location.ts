import { DataTypes, Model } from "sequelize";

import dbConnection from "../../infra/database/config/database";

import { LocationDto } from "../Dto/location";

export interface LocationAttributes {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Location
  extends Model<LocationAttributes, LocationDto>
  implements LocationAttributes
{
  declare id: string;
  declare name: string;
  declare description?: string;
  declare price: number;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Location.init(
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
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize: dbConnection,
    modelName: "Location",
    tableName: "Locations",
    timestamps: true,
  },
);
