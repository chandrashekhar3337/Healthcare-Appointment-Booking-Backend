import express from "express";
import validate
  from "../../middlewares/validate.middleware.js";
import verifyJWT from "../../middlewares/auth.middleware.js";
import authorizeRoles from "../../middlewares/role.middleware.js";
import {
  createSlotValidation,
  updateSlotValidation
} from "./doctor.validation.js";
import {
  createSlot,
  getDoctorSlots,
  getAllDoctors,
   getDoctorAppointments,
   getDoctorsWithAvailableSlots,
   deleteSlot,
   getDoctorAvailableSlots,
   updateSlot
} from "./doctor.controller.js";


const router = express.Router();

// PUBLIC
router.get(
  "/available",
  getDoctorsWithAvailableSlots
);
// ONLY DOCTOR CAN CREATE SLOT
router.post(
  "/slots",
  verifyJWT,
  authorizeRoles("doctor"),
  createSlotValidation,
  validate,
  createSlot
);
// DOCTOR APPOINTMENTS
router.get(
  "/appointments",
  verifyJWT,
  authorizeRoles("doctor"),
  getDoctorAppointments
);
router.get("/", getAllDoctors);
// PUBLIC API
router.get("/:id/slots", getDoctorSlots);
router.delete(
  "/slots/:id",
  verifyJWT,
  authorizeRoles("doctor"),
  deleteSlot,
  
);

router.get(
  "/:doctorId/slots",

  authorizeRoles,

  getDoctorAvailableSlots
);
router.patch(
  "/slots/:slotId",

 authorizeRoles,
  updateSlotValidation,
  validate,

  updateSlot
);

export default router;