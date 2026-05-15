import express from "express";

import verifyJWT from "../../middlewares/auth.middleware.js";
import authorizeRoles from "../../middlewares/role.middleware.js";
import {
  bookingLimiter,
} from "../../middlewares/rateLimit.middleware.js";

import validate
  from "../../middlewares/validate.middleware.js";

import {
  bookAppointmentValidation,
} from "./appointment.validation.js";
import {
  bookAppointment,
  cancelAppointment,getMyAppointments,getSingleAppointment
} from "./appointment.controller.js";

const router = express.Router();

// PATIENT APPOINTMENTS
router.get(
  "/my",
  verifyJWT,
  authorizeRoles("patient"),
  getMyAppointments
);
// ONLY PATIENT CAN BOOK
router.post(
  "/",
  verifyJWT,
  authorizeRoles("patient"),
  bookAppointmentValidation,
  validate,
  bookingLimiter,
  bookAppointment
);

router.get(
  "/:appointmentId",
  verifyJWT,
  authorizeRoles("patient"),

  getSingleAppointment
);
// ONLY PATIENT CAN CANCEL
router.delete(
  "/:id",
  verifyJWT,
  authorizeRoles("patient"),
  cancelAppointment
);

export default router;