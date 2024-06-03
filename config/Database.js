import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const db = new Sequelize("auxilium-db", "root", "1514131211", {
  host: "34.101.154.179",
  dialect: "mysql",
  dialectModule: mysql2, // Needed to fix sequelize issues with WebPack
});

export default db;
