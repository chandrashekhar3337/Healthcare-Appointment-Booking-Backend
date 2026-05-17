import User from "../user/user.model.js";
import jwt from "jsonwebtoken";
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

export const refreshAccessTokenService =
  async (
    incomingRefreshToken
  ) => {

    if (!incomingRefreshToken) {

      throw new ApiError(
        401,
        "Refresh token required"
      );
    }

    let decodedToken;

    try {

      decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env
          .REFRESH_TOKEN_SECRET
      );

    } catch {

      throw new ApiError(
        401,
        "Invalid refresh token"
      );
    }

    const user =
      await User.findById(
        decodedToken?._id
      );

    if (!user) {

      throw new ApiError(
        401,
        "User not found"
      );
    }

    if (
      incomingRefreshToken !==
      user.refreshToken
    ) {

      throw new ApiError(
        401,
        "Refresh token expired or reused"
      );
    }

    const accessToken =
      user.generateAccessToken();

    return {
      accessToken,
    };
  };