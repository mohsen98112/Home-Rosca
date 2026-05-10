import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("DB Connected"+"🌈✨");
    return pool;
  })
  .catch((err) => {
    console.error("DB Connection Failed:", err);
    throw err;
  });

export default poolPromise;
