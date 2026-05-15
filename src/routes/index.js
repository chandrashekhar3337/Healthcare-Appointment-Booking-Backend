import express from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import doctorRoutes from "../modules/doctor/doctor.routes.js";
import appointmentRoutes from "../modules/appointment/appointment.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/doctor", doctorRoutes);
router.use("/appointments", appointmentRoutes);

export default router;