import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  registerService,
  loginService,
  refreshAccessTokenService
} from "./auth.service.js";


const options = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
};


// REGISTER
export const register = asyncHandler(async (req, res) => {
  const data = await registerService(req.body);

  return res
    .status(201)
    .cookie("accessToken", data.accessToken, options)
    .cookie("refreshToken", data.refreshToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user: data.user,
        },
        "User registered successfully"
      )
    );
});


// LOGIN
export const login = asyncHandler(async (req, res) => {
  const data = await loginService(req.body);

  return res
    .status(200)
    .cookie("accessToken", data.accessToken, options)
    .cookie("refreshToken", data.refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: data.user,
        },
        "Login successful"
      )
    );
});

export const refreshAccessToken =
  asyncHandler(async (req, res) => {

    const incomingRefreshToken =
      req.cookies?.refreshToken ||
      req.body.refreshToken;

    const data =
      await refreshAccessTokenService(
        incomingRefreshToken
      );

    return res
      .status(200)
      .cookie(
        "accessToken",
        data.accessToken,
        {
          httpOnly: true,
          secure: true,
        }
      )
      .json(
        new ApiResponse(
          200,
          data,
          "Access token refreshed successfully"
        )
      );
  });