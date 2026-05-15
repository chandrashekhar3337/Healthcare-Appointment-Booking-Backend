import {
  body,
} from "express-validator";

export const createSlotValidation = [

  body("startTime")
    .isISO8601()
    .withMessage(
      "Valid startTime required"
    ),

  body("endTime")
    .isISO8601()
    .withMessage(
      "Valid endTime required"
    ),
];

export const updateSlotValidation = [

  body("startTime")
    .optional()
    .isISO8601()
    .withMessage(
      "Valid startTime required"
    ),

  body("endTime")
    .optional()
    .isISO8601()
    .withMessage(
      "Valid endTime required"
    ),
];