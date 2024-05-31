import mysql from "mysql2/promise.js";
import config from "../config/config.json" assert { type: "json" };

const createConnection = async () => {
  return await mysql.createConnection({
    host: config.development.host,
    user: config.development.username,
    password: config.development.password,
    database: config.development.database,
  }); // TODO apply config depending on environment
};

export const connection = await createConnection();
