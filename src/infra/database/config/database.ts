import { env } from "@/env";
import { Dialect, Sequelize } from "sequelize";

const dbname = env.DBNAME;
const dbusername = env.DBUSER;
const dbpass = env.DBPASSWORD;
const dbhost = env.DBHOST;
const dbport = env.DBPORT;
const dbdialect = env.DBDIALECT as Dialect;

const dbConnection = new Sequelize(dbname, dbusername, dbpass, {
  host: dbhost,
  port: dbport,
  dialect: dbdialect
});


export default dbConnection;
