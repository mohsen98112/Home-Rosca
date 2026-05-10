// Services/authService.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserByPhone,
  createUser,
  getUserProfileById
} from "../Models/authModel.js";

export const registerUser = async ({ fullName, phone, password }) => {
  if (!fullName || !phone || !password) {
    throw new Error("FullName, phone and password are required");
  }

  const existingUser = await findUserByPhone(phone);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await createUser({ fullName, phone, passwordHash });

  return { message: "User created successfully" };
};

export const loginUser = async ({ phone, password }) => {
  if (!phone || !password) {
    throw new Error("Phone and password are required");
  }

  const user = await findUserByPhone(phone);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (!user.IsActive) {
    throw new Error("User is inactive");
  }

  const isMatch = await bcrypt.compare(password, user.PasswordHash);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = jwt.sign(
    {
      id: user.Id,
      phone: user.Phone
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    {
      id: user.Id,
      phone: user.Phone
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export const getProfile = async (userId) => {
  const user = await getUserProfileById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
