import express from "express";

import verifyJWT from "../../middlewares/auth.middleware.js";

import { getMe } from "./user.controller.js";

const router = express.Router();

router.get("/me", verifyJWT, getMe);

export default router;