import { registerUser, loginUser, getProfile } from "../Services/authService.js";
import errorHandler from '../utilities/try-catch.js'
export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = errorHandler(
  const { accessToken, refreshToken } = await loginUser(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.status(200).json({ accessToken });
);

export const me = async (req, res) => {
  try {
    const user = await getProfile(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
