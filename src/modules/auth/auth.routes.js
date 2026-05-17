import express from "express";
import {
  authLimiter,
} from "../../middlewares/rateLimit.middleware.js";
import validate
  from "../../middlewares/validate.middleware.js";
  import {
  registerValidation,
  loginValidation,
} from "./auth.validation.js";
import {
  register,
  login,
  refreshAccessToken,
} from "./auth.controller.js";

const router = express.Router();

router.post("/register", registerValidation,validate, register);
router.post("/login",loginValidation, validate,authLimiter, login);
router.post(
  "/refresh-token",
  refreshAccessToken
);

export default router;