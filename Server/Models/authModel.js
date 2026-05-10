// Models/authModel.js
import sql from "mssql";
import poolPromise from "../Config/DbConfig.js";

export const findUserByPhone = async (phone) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Phone", sql.NVarChar(20), phone)
    .query("SELECT * FROM Users WHERE Phone = @Phone");

  return result.recordset[0];
};

export const createUser = async ({ fullName, phone, passwordHash }) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input("FullName", sql.NVarChar(200), fullName)
    .input("Phone", sql.NVarChar(20), phone)
    .input("PasswordHash", sql.NVarChar(200), passwordHash)
    .input("IsActive", sql.Bit, true)
    .query(`
      INSERT INTO Users (FullName, Phone, PasswordHash, IsActive, CreatedAt)
      VALUES (@FullName, @Phone, @PasswordHash, @IsActive, GETDATE())
    `);
};

export const getUserProfileById = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("Id", sql.BigInt, id)
    .query(`
      SELECT Id, FullName, Phone, IsActive, CreatedAt, UpdatedAt
      FROM Users
      WHERE Id = @Id
    `);

  return result.recordset[0];
};
