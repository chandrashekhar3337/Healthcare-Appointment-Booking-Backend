import User from "../user/user.model.js";

import ApiError from "../../utils/ApiError.js";
import generateAccessAndRefreshTokens from "../../utils/generateToken.js";


// REGISTER
export const registerService = async (payload) => {
  const { name, email, password, role } = payload;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const createdUser = await User.create({
    name,
    email,
    password,
    role,
  });

  const user = await User.findById(createdUser._id).select(
    "-password -refreshToken"
  );

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  return {
    user,
    accessToken,
    refreshToken,
  };
};


// LOGIN
export const loginService = async (payload) => {
  const { email, password } = payload;

  const user = await User.findOne({ email }).select(
    "+password +refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid =
    await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return {
    user: loggedInUser,
    accessToken,
    refreshToken,
  };
};