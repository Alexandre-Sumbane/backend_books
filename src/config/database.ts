import "dotenv/config";
import { Dialect, Sequelize } from "sequelize";

const dbname = process.env.DBNAME as string;
const dbusername = process.env.DBUSER as string;
const dbpass = process.env.DBPASS as string;
const dbhost = process.env.DBHOST as string;
const dbport = Number(process.env.DBPORT);
const dbdialect = process.env.DBDIALECT as Dialect;

const dbConnection = new Sequelize(dbname, dbusername, dbpass, {
  host: dbhost,
  port: dbport,
  dialect: dbdialect
});


export default dbConnection;
