import {
  body,
} from "express-validator";

export const bookAppointmentValidation = [

  body("slotId")
    .isMongoId()
    .withMessage(
      "Valid slotId required"
    ),
];